import { DataAwsIamPolicyDocument } from '@cdktf/provider-aws/lib/data-aws-iam-policy-document';
import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket';
import { S3BucketPolicy } from '@cdktf/provider-aws/lib/s3-bucket-policy';
import { S3BucketPublicAccessBlock } from '@cdktf/provider-aws/lib/s3-bucket-public-access-block';
import { Effect } from 'aws-cdk-lib/aws-iam';
import { type TerraformMetaArguments } from 'cdktf';
import { Construct } from 'constructs';

export interface PublicReadOnlyBucketConfig extends TerraformMetaArguments {
  bucketPrefix: string;
}

export class PublicReadOnlyBucket extends Construct {
  private readonly bucket: S3Bucket;

  constructor(scope: Construct, id: string, config: Readonly<PublicReadOnlyBucketConfig>) {
    super(scope, id);

    this.bucket = new S3Bucket(this, 's3-bucket', {
      bucketPrefix: config.bucketPrefix,
    });

    new S3BucketPublicAccessBlock(this, 'public-access-block', {
      bucket: this.bucket.id,
      blockPublicAcls: false,
      blockPublicPolicy: false,
    });

    new S3BucketPolicy(this, 'bucket-policy', {
      bucket: this.bucket.id,
      policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: new DataAwsIamPolicyDocument(this, 'policy-document', {
          statement: [
            {
              actions: ['s3:GetObject'],
              resources: [`${this.bucket.arn}/*`],
              effect: Effect.ALLOW,
            },
          ],
        }).json,
      }),
    });
  }

  public get name(): string {
    return this.bucket.id;
  }

  public get arn(): string {
    return this.bucket.arn;
  }
}
