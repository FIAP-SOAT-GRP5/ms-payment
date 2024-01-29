/* v8 ignore start */
import * as dynamoose from "dynamoose";
import { AnyItem } from "dynamoose/dist/Item";
import { v4 as uuidv4 } from 'uuid';
import { Order } from "../../domain/enterprise/entities/order.entity";
import { OrderStatusPayment } from '../../domain/enterprise/value-objects/order-status-payment';

export const OrderSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4()
	},
	orderOrigin_id: {
		type: Number,
	},
	status_payment: {
		type: String,
		enum: [OrderStatusPayment.APPROVED, OrderStatusPayment.REFUSED, OrderStatusPayment.PROCESSING],
		default: OrderStatusPayment.PROCESSING
	},
	payment_url: {
		type: String
	}
}, {
	timestamps: true
});

export const CreatedOrderSchema = dynamoose.model('Order', OrderSchema);

export const toDomain = (order: AnyItem): Order => {
	if (!order) return null;
	const entity = new Order();
	entity._id = order._id.toString();
	entity.orderOrigin_id = order.orderOrigin_id;
	entity.status_payment = order.status_payment;
	entity.payment_url = order.payment_url;
	return entity;
}

/* v8 ignore stop */