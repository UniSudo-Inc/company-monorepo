import { App } from 'cdktf';
import { ApiLambdaDynamoDBStack } from '@/stacks/api-lambda-dynamodb';

const app = new App();

new ApiLambdaDynamoDBStack(app, 'api-lambda-dynamodb-stack');

app.synth();
