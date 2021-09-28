import { Injectable } from '@nestjs/common';
import { DynamoDBImplements } from '../../common/dynamodb/dynamoDB-implements';

@Injectable()
export class DiagnosisRepository extends DynamoDBImplements {
  constructor() {
    super({ tableName: 'Diagnosis' });
  }
}
