import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IEntity } from '../../domain/application/interfaces/entity.interface';
import { OrderStatusPayment } from '../../domain/enterprise/value-objects/order-status-payment';

@Schema()
export class OrderSchema implements IEntity {
	@Prop()
	id: number;

	@Prop()
	status_payment: OrderStatusPayment;

	getId(): number {
		return this.id;
	}
}

export const CreatedOrderSchema = SchemaFactory.createForClass(OrderSchema);
