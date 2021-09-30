import { Injectable } from '@nestjs/common';
import { DynamoDBImplements } from '../../common/dynamodb/dynamoDB-implements';
import {
  BatchGetItemCommand,
  BatchGetItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { dynamoDB } from '../../common/connectors/dynamodb.connector';
import { unmarshall } from '@aws-sdk/util-dynamodb';

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

    const result = await dynamoDB.send(new BatchGetItemCommand(getParams));

    const { Responses } = result;

    const { Diagnosis } = Responses;

    const parseResponse = [];

    for (const item of Diagnosis) {
      parseResponse.push(unmarshall(item));
    }
    return { Items: parseResponse };
  }
}
