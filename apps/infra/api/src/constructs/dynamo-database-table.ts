import * as crypto from 'node:crypto';
import {
  DynamodbTable,
  type DynamodbTableGlobalSecondaryIndex,
  type DynamodbTableLocalSecondaryIndex,
} from '@cdktf/provider-aws/lib/dynamodb-table';
import { DynamodbTableItem } from '@cdktf/provider-aws/lib/dynamodb-table-item';
import { type TerraformMetaArguments } from 'cdktf';
import { Construct } from 'constructs';
import type { Attribute } from 'aws-cdk-lib/aws-dynamodb';

export interface DynamoDatabaseTableConfig extends TerraformMetaArguments {
  name: string;
  hashKey: Attribute;
  rangeKey?: Attribute;
  attributes?: Attribute[];
  readCapacity?: number;
  writeCapacity?: number;
}

export class DynamoDatabaseTable extends Construct {
  private readonly table: DynamodbTable;

  constructor(scope: Construct, id: string, config: Readonly<DynamoDatabaseTableConfig>) {
    super(scope, id);

    const attributes = [config.hashKey];
    if (config.rangeKey) {
      attributes.push(config.rangeKey);
    }
    if (config.attributes) {
      attributes.push(...config.attributes);
    }

    this.table = new DynamodbTable(this, 'table', {
      name: config.name,
      hashKey: config.hashKey.name,
      rangeKey: config.rangeKey?.name,
      attribute: attributes,
      billingMode: 'PAY_PER_REQUEST',
      pointInTimeRecovery: { enabled: true },
      lifecycle: {
        preventDestroy: false,
      },
    });
  }

  public addGlobalSecondaryIndexes(index: Omit<DynamodbTableGlobalSecondaryIndex, 'name'>[]): void {
    this.table.putGlobalSecondaryIndex(
      index.map((idx) => ({
        ...idx,
        name: `${idx.hashKey}${idx.rangeKey ?? ''}Index`,
      })),
    );
  }

  public addLocalSecondaryIndexes(index: DynamodbTableLocalSecondaryIndex[]): void {
    this.table.putLocalSecondaryIndex(index);
  }

  public addItem(item: Record<string, unknown>): void {
    const itemJson = JSON.stringify(item);
    const hash = crypto.createHash('sha256');
    hash.update(itemJson);

    new DynamodbTableItem(this, `item-${hash.digest('base64')}`, {
      tableName: this.table.name,
      hashKey: this.table.hashKey,
      rangeKey: this.table.rangeKey,
      item: itemJson,
    });
  }

  public get name(): string {
    return this.table.name;
  }

  public get globalIndexes(): string[] {
    if (!this.table.globalSecondaryIndexInput) {
      return [];
    }
    if (Array.isArray(this.table.globalSecondaryIndexInput)) {
      return this.table.globalSecondaryIndexInput.map((index) => index.name);
    }
    return [];
  }

  public get localIndexes(): string[] {
    if (!this.table.localSecondaryIndexInput) {
      return [];
    }
    if (Array.isArray(this.table.localSecondaryIndexInput)) {
      return this.table.localSecondaryIndexInput.map((index) => index.name);
    }
    return [];
  }

  public get arn(): string {
    return this.table.arn;
  }
}
