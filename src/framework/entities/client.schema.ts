import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Client } from '../../domain/enterprise/entities/client.entity';

@Schema()
export class ClientSchema {
	@Prop()
	email?: string;

	@Prop()
	document?: string;

	@Prop()
	name?: string;

	static toDomain(client: ClientSchema & {
		_id: Types.ObjectId;
	}): Client {
		if (!client) return null;
		const entity = new Client();
		entity._id = client._id.toString();
		entity.name = client.name;
		entity.document = client.document;
		entity.email = client.email;
		return entity;
	}
}

export const CreatedClientSchema = SchemaFactory.createForClass(ClientSchema);