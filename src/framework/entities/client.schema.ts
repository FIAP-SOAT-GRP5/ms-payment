/* v8 ignore start */
import * as dynamoose from "dynamoose";
import { AnyItem } from "dynamoose/dist/Item";
import { v4 as uuidv4 } from 'uuid';
import { Client } from '../../domain/enterprise/entities/client.entity';

export const ClientSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4()
	},
	email: {
		type: String
	},
	document: {
		type: String
	},
	name: {
		type: String
	}
}, {
	timestamps: true
});

export const CreatedClientSchema = dynamoose.model('Client', ClientSchema);

export const toDomain = (client: AnyItem): Client => {
	if (!client) return null;
	const entity = new Client();
	entity._id = client._id.toString();
	entity.name = client.name;
	entity.document = client.document;
	entity.email = client.email;
	return entity;
}
/* v8 ignore stop */