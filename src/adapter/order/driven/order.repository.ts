import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from '../../../core/domain/order.entity';
import { OrderToCreateDto } from '../../../core/dtos/order-to-create.dto';
import { IOrderRepositoryPort } from '../../../core/applications/ports/order-repository.port';

import { OrderStatus } from '../../../core/value-objects/order-status';
import { PaymentStatus } from 'src/core/value-objects/payment-status';

@Injectable()
export class OrderRepository implements IOrderRepositoryPort {
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
		status: OrderStatus,
		paymentStatus: PaymentStatus
	): Promise<boolean> {
		const exists = this.orderRepository.exist({
			where: {
				id,
			},
		});
		if (!exists) return false;
		await this.orderRepository.update(id, {
			status,
			status_payment: paymentStatus,
		});
		return true;
	}
	create(orderToCreate: OrderToCreateDto): Promise<Order> {
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
	listProcessingOrders(): Promise<Order[]> {
		return this.orderRepository.find({
			where: {
				status: In([OrderStatus.PROCESSING, OrderStatus.RECEIVED]),
			},
			relations: [
				'orderItems',
				'client',
				'orderItems.item',
				'orderItems.item.category',
			],
		});
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
