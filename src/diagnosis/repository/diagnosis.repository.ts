import { Injectable } from '@nestjs/common';
import { DynamoDBImplements } from '../../common/dynamodb/dynamoDB-implements';
import {
  BatchGetItemCommand,
  BatchGetItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { dynamoDB } from '../../common/connectors/dynamodb.connector';

@Injectable()
export class DiagnosisRepository extends DynamoDBImplements {
  constructor() {
    super({ tableName: 'Diagnosis' });
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
}
