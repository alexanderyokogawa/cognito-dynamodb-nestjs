import {
  DeleteCommand,
  DeleteCommandInput,
  PutCommand,
  PutCommandInput,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';
import { dynamoDB } from '../connectors/dynamodb.connector';
import {
  BatchGetItemCommand,
  BatchGetItemCommandInput,
  GetItemCommand,
  GetItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { Logger } from '@nestjs/common';

export class DynamoDBImplements {
  private readonly logger = new Logger(DynamoDBImplements.name);

  private readonly tableName: string;

  constructor({ tableName }) {
    this.tableName = tableName;
  }

  async create(param: any): Promise<any> {
    const putParams: PutCommandInput = {
      TableName: this.tableName,
      Item: {
        id: uuid(),
        ...param,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    this.logger.log('putParams->', JSON.stringify(putParams));

    const command = new PutCommand(putParams);

    return dynamoDB.send(command);
  }

  async findAll(): Promise<any> {
    const getParams: ScanCommandInput = {
      TableName: this.tableName,
    };

    return dynamoDB.send(new ScanCommand(getParams));
  }

  async findById(id: string): Promise<any> {
    const getParams: GetItemCommandInput = {
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    };

    return dynamoDB.send(new GetItemCommand(getParams));
  }

  async findInId(groupId: Record<string, any>): Promise<any> {
    const { items } = groupId;
    const keys = [];
    for (const item of items) {
      keys.push({ id: { S: item } });
    }

    const getParams: BatchGetItemCommandInput = {
      RequestItems: {
        Diagnosis: {
          Keys: keys,
        },
      },
    };

    console.log('getParams->', getParams);

    return dynamoDB.send(new BatchGetItemCommand(getParams));
  }

  async update(id: string, param: any): Promise<any> {
    const pathParams: PutCommandInput = {
      TableName: this.tableName,
      Item: {
        id: id,
        ...param,
        updatedAt: new Date().toISOString(),
      },
    };

    return dynamoDB.send(new PutCommand(pathParams));
  }

  async remove(id: string): Promise<any> {
    const deleteParams: DeleteCommandInput = {
      TableName: this.tableName,
      Key: {
        id: { id },
      },
    };

    return dynamoDB.send(new DeleteCommand(deleteParams));
  }
}
