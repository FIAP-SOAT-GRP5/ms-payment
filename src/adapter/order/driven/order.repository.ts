import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from '../../../core/domain/order.entity';
import { IOrderRepositoryPort } from '../../../core/applications/ports/order-repository.port';
import { OrderStatus } from '../../../core/value-objects/order-status';
import { OrderToCreateDto } from '../../../core/dtos/order-to-create.dto';

@Injectable()
export class OrderRepository implements IOrderRepositoryPort {
	constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {
	}
	async updateFinishedAt(id: number): Promise<boolean> {
		const exists = this.orderRepository.exist({
			where: {
				id
			}
		});
		if (!exists) return false;
		await this.orderRepository.update(id, {
			finishedAt: new Date(),
		})
		return true;
	}
	async updateStatus(id: number, status: OrderStatus): Promise<boolean> {
		const exists = this.orderRepository.exist({
			where: {
				id
			}
		});
		if (!exists) return false;
		await this.orderRepository.update(id, {
			status,
		})
		return true;
	}
	create(orderToCreate: OrderToCreateDto): Promise<Order> {
		return this.orderRepository.save(orderToCreate).then(order => {
			return this.findById(order.id);
		});
	}
	findById(id: number): Promise<Order> {
		return this.orderRepository.findOne({
			where: {
				id,
			},
			relations: ['orderItems', 'client', 'orderItems.item', 'orderItems.item.category'],
		});
	}
	listProcessingOrders(): Promise<Order[]> {
		return this.orderRepository.find({
			where: {
				status: In([OrderStatus.PROCESSING, OrderStatus.RECEIVED])
			},
			relations: ['orderItems', 'client', 'orderItems.item', 'orderItems.item.category'],
		});
	}
}
