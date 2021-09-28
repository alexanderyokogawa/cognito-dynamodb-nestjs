import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamodbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.AWS_DYNAMODB_ENDPOINT || 'http://localhost:8000',
});

export const dynamoDB = DynamoDBDocumentClient.from(dynamodbClient);
