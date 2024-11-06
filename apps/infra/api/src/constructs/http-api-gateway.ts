import { Apigatewayv2Api } from '@cdktf/provider-aws/lib/apigatewayv2-api';
import { Apigatewayv2Stage } from '@cdktf/provider-aws/lib/apigatewayv2-stage';
import { CloudwatchLogGroup } from '@cdktf/provider-aws/lib/cloudwatch-log-group';
import { type TerraformMetaArguments } from 'cdktf';
import { Construct } from 'constructs';
import { accessLogFormat } from '@/configs/log';

export interface HttpApiGatewayConfig extends TerraformMetaArguments {
  name: string;
}

export class HttpApiGateway extends Construct {
  private readonly gateway: Apigatewayv2Api;

  constructor(scope: Construct, id: string, config: Readonly<HttpApiGatewayConfig>) {
    super(scope, id);

    this.gateway = new Apigatewayv2Api(this, 'api-gateway', {
      name: config.name,
      protocolType: 'HTTP',
      corsConfiguration: {
        allowOrigins: ['http://localhost:3000'],
        allowHeaders: ['*'],
        allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
        allowCredentials: true,
      },
    });

    const log = new CloudwatchLogGroup(this, `api-gateway-log-group-default`, {
      name: `/aws/apigateway/${this.gateway.name}/access-log/default`,
    });
    new Apigatewayv2Stage(this, `api-gateway-stage-default`, {
      name: '$default',
      autoDeploy: true,
      apiId: this.gateway.id,
      accessLogSettings: {
        destinationArn: log.arn,
        format: JSON.stringify(accessLogFormat),
      },
      defaultRouteSettings: {
        throttlingBurstLimit: 5000,
        throttlingRateLimit: 10000,
      },
    });
  }

  public get id(): string {
    return this.gateway.id;
  }

  public get endpoint(): string {
    return this.gateway.apiEndpoint;
  }

  public get executionArn(): string {
    return this.gateway.executionArn;
  }
}
