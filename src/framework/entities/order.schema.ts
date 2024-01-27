/* v8 ignore start */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Order } from '../../domain/enterprise/entities/order.entity';
import { OrderStatusPayment } from '../../domain/enterprise/value-objects/order-status-payment';

@Schema()
export class OrderSchema {
	@Prop({
		type: Number
	})
	orderOrigin_id: number;

	@Prop({
		enum: OrderStatusPayment,
		default: OrderStatusPayment.PROCESSING,
		type: String
	})
	status_payment: OrderStatusPayment;

	@Prop({
		type: String
	})
	payment_url: string;

	static toDomain(order: OrderSchema & {
		_id: Types.ObjectId;
	}): Order {
		if (!order) return null;
		const entity = new Order();
		entity._id = order._id.toString();
		entity.orderOrigin_id = order.orderOrigin_id;
		entity.status_payment = order.status_payment;
		entity.payment_url = order.payment_url;
		return entity;
	}
}

export const CreatedOrderSchema = SchemaFactory.createForClass(OrderSchema);
/* v8 ignore stop */