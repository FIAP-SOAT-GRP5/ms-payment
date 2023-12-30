import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IOrderRepository } from '../../../domain/application/interfaces/order/order-repository.interface';
import { EntityPartial, FindOptionsWhereValue } from '../../../domain/application/utils/repository';
import { Order } from '../../../domain/enterprise/entities/order.entity';
import { OrderStatus } from '../../../domain/enterprise/value-objects/order-status';
import { OrderEntity } from '../../entities/order.entity';

@Injectable()
export class OrderRepository implements IOrderRepository {
	constructor(
		@InjectRepository(OrderEntity)
		private readonly orderRepository: Repository<OrderEntity>
	) {}

	exists(where?: FindOptionsWhereValue<Order>): Promise<boolean> {
		return this.orderRepository.exist({ where });
	}

	find(where?: FindOptionsWhereValue<Order>): Promise<Order[]> {
		return this.orderRepository.find({
			where,
		});
	}

	findOne(where?: FindOptionsWhereValue<Order>): Promise<Order> {
		return this.orderRepository.findOne({
			where,
		})
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

	save(data: EntityPartial<Order>): Promise<Order> {
		return this.orderRepository.save(data);
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

	async listAllOrders(): Promise<Order[]> {
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
