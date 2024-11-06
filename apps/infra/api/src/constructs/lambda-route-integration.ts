import { Apigatewayv2Integration } from '@cdktf/provider-aws/lib/apigatewayv2-integration';
import { Apigatewayv2Route } from '@cdktf/provider-aws/lib/apigatewayv2-route';
import { LambdaPermission } from '@cdktf/provider-aws/lib/lambda-permission';
import { type TerraformMetaArguments } from 'cdktf';
import { Construct } from 'constructs';
import type { HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { type NodejsFunction } from './nodejs-function';

export interface LambdaRouteIntegrationConfig extends TerraformMetaArguments {
  apiId: string;
  apiExecutionArn: string;
  lambdaFunction: NodejsFunction;
  method: HttpMethod;
  path: string;
}

export class LambdaRouteIntegration extends Construct {
  readonly integration: Apigatewayv2Integration;
  readonly route: Apigatewayv2Route;

  constructor(scope: Construct, id: string, config: Readonly<LambdaRouteIntegrationConfig>) {
    super(scope, id);

    this.integration = new Apigatewayv2Integration(this, 'integration', {
      apiId: config.apiId,
      integrationType: 'AWS_PROXY',
      integrationUri: config.lambdaFunction.invokeArn,
      payloadFormatVersion: '2.0',
    });

    this.route = new Apigatewayv2Route(this, 'route', {
      apiId: config.apiId,
      routeKey: `${config.method} ${config.path}`,
      target: `integrations/${this.integration.id}`,
    });

    new LambdaPermission(this, 'apigw-lambda-permission', {
      functionName: config.lambdaFunction.functionName,
      action: 'lambda:InvokeFunction',
      principal: 'apigateway.amazonaws.com',
      qualifier: config.lambdaFunction.qualifier,
      sourceArn: `${config.apiExecutionArn}/*/*`,
    });
  }
}
