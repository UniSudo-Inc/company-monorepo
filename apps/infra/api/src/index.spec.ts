// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Testing } from 'cdktf';
import 'cdktf/lib/testing/adapters/jest'; // Load types for expect matchers
import { LambdaFunction } from '@cdktf/provider-aws/lib/lambda-function';
import { ApiLambdaDynamoDBStack } from '@/stacks/api-lambda-dynamodb';

describe('my CDKTF Application', () => {
  // The tests below are example tests, you can find more information at
  // https://cdk.tf/testing
  it('should have a lambda function', () => {
    const app = Testing.app();
    const stack = new ApiLambdaDynamoDBStack(app, 'my-app');
    const synthesized = Testing.synth(stack);

    expect(synthesized).toHaveResource(LambdaFunction);
  });
});
