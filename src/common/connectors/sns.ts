import * as AWS from 'aws-sdk';
import { IS_LOCAL } from '../env';

AWS.config.setPromisesDependency(null);

const SNS = IS_LOCAL
  ? new AWS.SNS({
      region: process.env.AWS_REGION,
      endpoint: `http://127.0.0.1:${process.env.SNS_PORT || 9326}`,
    })
  : new AWS.SNS();

/**
 * SNS Abstraction Library
 * @Author: Joao Costa <costa@budacar.com>
 * @publish() - Save Item on SQS Topic;
 */
const client = {
  /**
   * Save Item on SQS Topic
   */
  publish: (topic = null, payload = {}, attributes = {}) => {
    const params = {
      TopicArn: topic,
      Message: JSON.stringify(payload),
      MessageAttributes: attributes,
    };
    return SNS.publish(params).promise();
  },
};

export default client;
