import {
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import { dynamoDB } from '../../common/connectors/dynamodb.connector';

const diagnosisTableParams: CreateTableCommandInput = {
  TableName: 'Diagnosis',
  KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
  AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

const command = new CreateTableCommand(diagnosisTableParams);

dynamoDB
  .send(command)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
