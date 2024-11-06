import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { type App, TerraformStack } from 'cdktf';
import { HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { ArchiveProvider } from '@cdktf/provider-archive/lib/provider';
import { Effect } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from '@/constructs/nodejs-function';
import { DynamoDatabaseTable } from '@/constructs/dynamo-database-table';
import { LambdaRouteIntegration } from '@/constructs/lambda-route-integration';
import { HttpApiGateway } from '@/constructs/http-api-gateway';

export class ApiLambdaDynamoDBStack extends TerraformStack {
  constructor(app: App, id: string) {
    super(app, id);

    new AwsProvider(this, 'aws', {
      region: 'us-east-1',
    });
    new ArchiveProvider(this, 'archive');

    const dynamoTable = new DynamoDatabaseTable(this, 'items', {
      name: 'items',
      hashKey: {
        name: 'itemId',
        type: AttributeType.STRING,
      },
    });

    const getAllLambda = new NodejsFunction(this, 'get-all-items-function', {
      name: 'get-all-items',
      policyDocument: [
        {
          actions: ['dynamodb:Scan'],
          resources: [dynamoTable.arn],
          effect: Effect.ALLOW,
        },
      ],
      environment: {
        variables: {
          TABLE_NAME: dynamoTable.name,
        },
      },
    });

    const api = new HttpApiGateway(this, 'items-api', {
      name: 'items-api',
    });

    new LambdaRouteIntegration(this, 'get-all-items-integration', {
      apiId: api.id,
      apiExecutionArn: api.executionArn,
      lambdaFunction: getAllLambda,
      method: HttpMethod.GET,
      path: '/items',
    });
  }
}
