import * as fs from 'node:fs';
import * as path from 'node:path';
import { DataArchiveFile } from '@cdktf/provider-archive/lib/data-archive-file';
import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket';
import { S3BucketPublicAccessBlock } from '@cdktf/provider-aws/lib/s3-bucket-public-access-block';
import { S3Object } from '@cdktf/provider-aws/lib/s3-object';
import { AssetType, TerraformAsset, type TerraformMetaArguments } from 'cdktf';
import { Construct } from 'constructs';
import esbuild from 'esbuild';

export interface LambdaCodeArtifactConfig extends TerraformMetaArguments {
  functionName: string;
}

export class LambdaCodeArtifact extends Construct {
  private readonly s3Bucket: S3Bucket;
  private readonly s3Object: S3Object;
  readonly version: string;

  constructor(scope: Construct, id: string, config: Readonly<LambdaCodeArtifactConfig>) {
    super(scope, id);

    const workingDir = path.resolve(__dirname, '..', '..', 'assets', 'functions', config.functionName);
    const packageJson = fs.readFileSync(path.join(workingDir, 'package.json'), 'utf-8');
    const outDir = path.join(workingDir, 'dist');
    this.version = JSON.parse(packageJson).version as string;

    esbuild.buildSync({
      entryPoints: [path.join(workingDir, 'src', 'index.ts')],
      platform: 'node',
      target: 'node20',
      bundle: true,
      minify: true,
      metafile: true,
      format: 'cjs',
      treeShaking: true,
      legalComments: 'external',
      sourcemap: 'external',
      outdir: outDir,
      external: ['@aws-sdk/*'],
      tsconfig: path.join(workingDir, 'tsconfig.json'),
    });

    const bundle = new TerraformAsset(this, 'function-bundle', {
      path: outDir,
      type: AssetType.DIRECTORY,
    });

    const localArchive = new DataArchiveFile(this, 'local-archive', {
      type: 'zip',
      sourceDir: bundle.path,
      outputPath: path.join('archives', `${config.functionName}-${bundle.assetHash}.zip`),
    });

    this.s3Bucket = new S3Bucket(this, 'bucket', {
      bucketPrefix: `${config.functionName}-archive-`,
    });
    new S3BucketPublicAccessBlock(this, 'public-access-block', {
      bucket: this.s3Bucket.bucket,
      blockPublicAcls: true,
      blockPublicPolicy: true,
    });
    this.s3Object = new S3Object(this, 'remote-archive', {
      bucket: this.s3Bucket.bucket,
      key: `${this.version}/${localArchive.id}.zip`,
      source: localArchive.outputPath,
    });
  }

  get bucket(): string {
    return this.s3Bucket.bucket;
  }

  get key(): string {
    return this.s3Object.key;
  }
}
