import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { OrderToCreateDto } from '../../../../domain/dtos/order-to-create.dto';
import { Order } from '../../../../domain/entities/order.entity';
import { IOrderGateway } from '../../../../domain/interfaces/order/order.gateway.interface';

import { PaymentStatus } from 'src/domain/value-objects/payment-status';
import { OrderStatus } from '../../../../domain/value-objects/order-status';

@Injectable()
export class OrderRepository implements IOrderGateway {
	constructor(
		@InjectRepository(Order) private orderRepository: Repository<Order>
	) {}
	async updateFinishedAt(id: number): Promise<boolean> {
		const exists = this.orderRepository.exist({
			where: {
				id,
			},
		});
		if (!exists) return false;
		await this.orderRepository.update(id, {
			finishedAt: new Date(),
		});
		return true;
	}
	async updateStatus(id: number, status: OrderStatus): Promise<boolean> {
		const exists = this.orderRepository.exist({
			where: {
				id,
			},
		});
		if (!exists) return false;
		await this.orderRepository.update(id, {
			status,
		});
		return true;
	}
	async updateStatusAndPaymentStatus(
		id: number,
		paymentStatus: PaymentStatus
	): Promise<boolean> {
		const exists = this.orderRepository.exist({
			where: {
				id,
			},
		});
		if (!exists) return false;
		await this.orderRepository.update(id, {
			status:
				paymentStatus === PaymentStatus.APPROVED
					? OrderStatus.RECEIVED
					: OrderStatus.CANCELED,
			status_payment: paymentStatus,
		});
		return true;
	}

	async updateOrderPaymentStatusProcessing(
		id: number
	): Promise<Order> {
		await this.orderRepository.update(id, {
			status_payment: PaymentStatus.PROCESSING,
		});
		return this.findById(id);
	}

	async updateOrderPaymentStatusApproved(
		id: number
	): Promise<Order> {
		await this.orderRepository.update(id, {
			status_payment: PaymentStatus.APPROVED,
			status: OrderStatus.RECEIVED,
		});
		return await this.findById(id);
	}

	async updateOrderPaymentStatusRefused(
		id: number
	): Promise<Order> {
		await this.orderRepository.update(id, {
			status_payment: PaymentStatus.REFUSED,
			status: OrderStatus.CANCELED,
		});
		return this.findById(id);
	}

	async create(orderToCreate: OrderToCreateDto): Promise<Order> {
		return this.orderRepository.save(orderToCreate).then((order) => {
			return this.findById(order.id);
		});
	}

	findById(id: number): Promise<Order> {
		return this.orderRepository.findOne({
			where: {
				id,
			},
			relations: [
				'orderItems',
				'client',
				'orderItems.item',
				'orderItems.item.category',
			],
		});
	}
	async listProcessingOrders(): Promise<Order[]> {

		const ready = await this.orderRepository.find({
			where: {
				status: In([OrderStatus.READY]),
			},
			order: {
				createdAt: 'ASC',
			},
			relations: [
				'orderItems',
				'client',
				'orderItems.item',
				'orderItems.item.category',
			],
		});
		const processing = await this.orderRepository.find({
			where: {
				status: In([OrderStatus.PROCESSING]),
			},
			order: {
				createdAt: 'ASC',
			},
			relations: [
				'orderItems',
				'client',
				'orderItems.item',
				'orderItems.item.category',
			],
		});
		const received = await this.orderRepository.find({
			where: {
				status: In([OrderStatus.RECEIVED]),
			},
			order: {
				createdAt: 'ASC',
			},
			relations: [
				'orderItems',
				'client',
				'orderItems.item',
				'orderItems.item.category',
			],
		});
		return ready.concat(processing, received)
	}

	listAllOrders(): Promise<Order[]> {
		return this.orderRepository.find({
			where: {
				status: In([
					OrderStatus.AWAITING_PAYMENT,
					OrderStatus.FINISHED,
					OrderStatus.PROCESSING,
					OrderStatus.READY,
					OrderStatus.RECEIVED,
				]),
			},
			relations: [
				'orderItems',
				'client',
				'orderItems.item',
				'orderItems.item.category',
			],
		});
	}

}
