/* v8 ignore start */
import { OrderStatusPayment } from '@/domain/enterprise/value-objects/order-status-payment';
import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../domain/application/interfaces/order/order-repository.interface';
import { OrderToCreateDto } from '../../../domain/enterprise/dtos/order-to-create.dto';
import { Order } from '../../../domain/enterprise/entities/order.entity';
import { CreatedOrderSchema, toDomain } from '../../entities/order.schema';

@Injectable()
export class OrderRepository implements IOrderRepository {

	async create(orderToCreate: OrderToCreateDto): Promise<Order> {
		return CreatedOrderSchema.create(orderToCreate).then(toDomain);
	}

	async updateOrderStatusPaymentApproved(
		id: number
	): Promise<Order> {
		const order = await CreatedOrderSchema.scan('orderOrigin_id').eq(id).exec().then((orders) => {
			return orders.map(toDomain)[0];
		})
		await CreatedOrderSchema.update(order._id, {
			status_payment: OrderStatusPayment.APPROVED,
		});
		return CreatedOrderSchema.scan('orderOrigin_id').eq(id).exec().then((orders) => {
			return orders.map(toDomain)[0];
		});
	}

	async updateOrderStatusPaymentRefused(
		id: number
	): Promise<Order> {
		const order = await CreatedOrderSchema.scan('orderOrigin_id').eq(id).exec().then((orders) => {
			return orders.map(toDomain)[0];
		})
		await CreatedOrderSchema.update(order._id, {
			status_payment: OrderStatusPayment.REFUSED,
		});
		return CreatedOrderSchema.scan('orderOrigin_id').eq(id).exec().then((orders) => {
			return orders.map(toDomain)[0];
		});
	}

}
/* v8 ignore stop */
