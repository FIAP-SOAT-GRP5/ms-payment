/* v8 ignore start */
import * as dynamoose from "dynamoose";
import env from './env';

const ddb = new dynamoose.aws.ddb.DynamoDB({
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY
	},
	region: env.AWS_REGION
});

dynamoose.aws.ddb.set(ddb);

/* v8 ignore stop */