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
		return createdOrder.save().then((order) => {
			return this.orderRepository.findOne( { id: order.id } ).exec();
		});
	}

	findOrderById(id: number): Promise<Order> {
		return this.orderRepository.findOne({id}).exec();
	}

	listAllOrders(): Promise<Order[]> {
		return this.orderRepository.find().exec();
	}

	getProcessingOrders(): Promise<Order[]> {
		return this.orderRepository.find({
			'status_payment': OrderStatusPayment.PROCESSING
		}).exec();
	}

	getApprovedOrders(): Promise<Order[]> {
		return this.orderRepository.find({
			'status_payment': OrderStatusPayment.APPROVED
		}).exec();
	}

	getRefusedOrders(): Promise<Order[]> {
		return this.orderRepository.find({
			'status_payment': OrderStatusPayment.REFUSED
		}).exec();
	}

	async updateOrderStatusPaymentApproved(
		id: number
	): Promise<Order> {
		await this.orderRepository.findOneAndUpdate({ id },{			
			status_payment: OrderStatusPayment.APPROVED,
		});
		return await this.orderRepository.findOne({ id });
	}

	async updateOrderStatusPaymentRefused(
		id: number
	): Promise<Order> {
		await this.orderRepository.findOneAndUpdate({ id },{			
			status_payment: OrderStatusPayment.REFUSED,
		});
		return await this.orderRepository.findOne({ id });
	}

}
/* v8 ignore stop */
