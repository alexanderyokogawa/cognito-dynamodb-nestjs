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
import { GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Logger } from '@nestjs/common';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

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

    await dynamoDB.send(command);

    return this.findById(putParams.Item.id);
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
      Key: marshall({ id: id }),
    };

    const result = await dynamoDB.send(new GetItemCommand(getParams));

    return unmarshall(result.Item || {});
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

    await dynamoDB.send(new PutCommand(pathParams));

    return this.findById(pathParams.Item.id);
  }

  async remove(id: string): Promise<void> {
    const deleteParams: DeleteCommandInput = {
      TableName: this.tableName,
      Key: {
        id: { id },
      },
    };

    await dynamoDB.send(new DeleteCommand(deleteParams));
  }
}
