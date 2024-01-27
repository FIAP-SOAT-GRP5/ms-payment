import { IEntity } from '@/domain/application/interfaces/entity.interface';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ClientSchema implements IEntity {
	@Prop()
	id: number;

	@Prop()
	email?: string;

	@Prop()
	document?: string;

	@Prop()
	name?: string;

	getId(): number {
		return this.id;
	}
}

export const CreatedClientSchema = SchemaFactory.createForClass(ClientSchema);