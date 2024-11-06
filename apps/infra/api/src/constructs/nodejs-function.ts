import { CloudwatchLogGroup } from '@cdktf/provider-aws/lib/cloudwatch-log-group';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import { IamRolePolicy } from '@cdktf/provider-aws/lib/iam-role-policy';
import { IamRolePolicyAttachment } from '@cdktf/provider-aws/lib/iam-role-policy-attachment';
import {
  LambdaEventSourceMapping,
  type LambdaEventSourceMappingConfig,
} from '@cdktf/provider-aws/lib/lambda-event-source-mapping';
import { LambdaFunction, type LambdaFunctionEnvironment } from '@cdktf/provider-aws/lib/lambda-function';
import { LambdaPermission, type LambdaPermissionConfig } from '@cdktf/provider-aws/lib/lambda-permission';
import { type TerraformMetaArguments } from 'cdktf';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import {
  DataAwsIamPolicyDocument,
  type DataAwsIamPolicyDocumentStatement,
} from '@cdktf/provider-aws/lib/data-aws-iam-policy-document';
import { Effect } from 'aws-cdk-lib/aws-iam';
import { LambdaCodeArtifact } from './lambda-code-artifact';

export interface NodejsFunctionConfig extends TerraformMetaArguments {
  name: string;
  policyDocument?: DataAwsIamPolicyDocumentStatement[];
  environment?: LambdaFunctionEnvironment;
  memory?: number;
}

export class NodejsFunction extends Construct {
  private readonly lambdaFunction: LambdaFunction;
  private readonly role: IamRole;

  constructor(scope: Construct, id: string, config: Readonly<NodejsFunctionConfig>) {
    super(scope, id);

    const artifact = new LambdaCodeArtifact(this, 'lambda-code-artifact', {
      functionName: config.name,
    });

    const lambdaAssumeRolePolicy = {
      Version: '2012-10-17',
      Statement: new DataAwsIamPolicyDocument(this, 'assume-role-policy', {
        statement: [
          {
            actions: ['sts:AssumeRole'],
            effect: Effect.ALLOW,
            principals: [{ type: 'Service', identifiers: ['lambda.amazonaws.com'] }],
          },
        ],
      }).json,
    };

    this.role = new IamRole(this, 'iam-role', {
      name: `${config.name}-role`,
      assumeRolePolicy: JSON.stringify(lambdaAssumeRolePolicy),
    });
    new IamRolePolicyAttachment(this, 'lambda-managed-policy', {
      role: this.role.name,
      policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    });

    this.lambdaFunction = new LambdaFunction(this, 'lambda-function', {
      functionName: config.name,
      s3Bucket: artifact.bucket,
      s3Key: artifact.key,
      handler: 'index.handler',
      runtime: Runtime.NODEJS_20_X.name,
      role: this.role.arn,
      memorySize: config.memory,
      publish: true,
      environment: config.environment,
    });

    new CloudwatchLogGroup(this, 'log-group', {
      name: `/aws/lambda/${this.lambdaFunction.functionName}`,
      retentionInDays: 365,
    });

    if (config.policyDocument) {
      this.applyPolicy(config.policyDocument);
    }
  }

  public get functionName(): string {
    return this.lambdaFunction.functionName;
  }

  public get arn(): string {
    return this.lambdaFunction.arn;
  }

  public get invokeArn(): string {
    return this.lambdaFunction.qualifiedInvokeArn;
  }

  public get qualifier(): string {
    return this.lambdaFunction.version;
  }

  public applyPolicy(statement: DataAwsIamPolicyDocumentStatement[]): IamRolePolicy {
    return new IamRolePolicy(this, 'managed-policy', {
      name: `${this.lambdaFunction.functionName}-policy`,
      role: this.role.name,
      policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: new DataAwsIamPolicyDocument(this, 'policy-document', { statement }).json,
      }),
    });
  }

  public applyAwsManagedPolicy(policy: string): IamRolePolicyAttachment {
    return new IamRolePolicyAttachment(this, 'aws-managed-policy', {
      role: this.role.name,
      policyArn: policy,
    });
  }

  public addEventSourceMapping(config: Omit<LambdaEventSourceMappingConfig, 'functionName'>): LambdaEventSourceMapping {
    return new LambdaEventSourceMapping(this, 'event-source-mapping', {
      functionName: this.lambdaFunction.functionName,
      ...config,
    });
  }

  public addPermission(config: Omit<LambdaPermissionConfig, 'functionName'>): LambdaPermission {
    return new LambdaPermission(this, 'permission', {
      functionName: this.lambdaFunction.functionName,
      ...config,
    });
  }
}
