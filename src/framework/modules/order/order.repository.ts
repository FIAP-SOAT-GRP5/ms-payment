/* v8 ignore start */
import { OrderStatusPayment } from '@/domain/enterprise/value-objects/order-status-payment';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrderRepository } from '../../../domain/application/interfaces/order/order-repository.interface';
import { OrderToCreateDto } from '../../../domain/enterprise/dtos/order-to-create.dto';
import { Order } from '../../../domain/enterprise/entities/order.entity';
import { OrderSchema } from '../../entities/order.schema';

@Injectable()
export class OrderRepository implements IOrderRepository {
	constructor(
		@InjectModel(OrderSchema.name)
		private readonly orderRepository: Model<OrderSchema>
	) {}

	async create(orderToCreate: OrderToCreateDto): Promise<Order> {
		const createdOrder = new this.orderRepository(orderToCreate)
		return createdOrder.save().then(async (order) => {
			return OrderSchema.toDomain(await this.orderRepository.findOne({ _id: order._id }).exec());
		});
	}

	async updateOrderStatusPaymentApproved(
		id: number
	): Promise<Order> {
		await this.orderRepository.findOneAndUpdate({ orderOrigin_id: id }, {
			status_payment: OrderStatusPayment.APPROVED,
		});
		return OrderSchema.toDomain(await this.orderRepository.findOne({ _id: id }));
	}

	async updateOrderStatusPaymentRefused(
		id: number
	): Promise<Order> {
		await this.orderRepository.findOneAndUpdate({ orderOrigin_id: id }, {
			status_payment: OrderStatusPayment.REFUSED,
		});
		return OrderSchema.toDomain(await this.orderRepository.findOne({ orderOrigin_id: id }));
	}

}
/* v8 ignore stop */
