import { Order } from '../../domain/order.entity';
import { IUpdateOrderStatusService } from '../interfaces/update-order-status.service.interface';

import { InvalidOrderStatusError } from '../../errors/invalid-order-status.error';
import { OrderNotFoundError } from '../../errors/order-not-found.error';

import { INotifyOrderPort } from '../ports/notify-order.port';
import { IOrderRepositoryPort } from '../ports/order-repository.port';

import { OrderStatus } from '../../value-objects/order-status';
import { PaymentStatus } from 'src/core/value-objects/payment-status';

export class UpdateOrderStatusService implements IUpdateOrderStatusService {
	constructor(
		private readonly orderRepository: IOrderRepositoryPort,
		private readonly notifyOrder: INotifyOrderPort
	) {}

	private async validateOrderAndStatus(
		id: number,
		...status: OrderStatus[]
	): Promise<void> {
		const order = await this.orderRepository.findById(id);
		if (!order) throw new OrderNotFoundError();
		if (!status.includes(order.status))
			throw new InvalidOrderStatusError(...status);
	}

	async updateStatusProcessing(id: number): Promise<Order> {
		await this.validateOrderAndStatus(id, OrderStatus.RECEIVED);
		await this.orderRepository.updateStatus(id, OrderStatus.PROCESSING);
		this.notifyOrder.emitOrderIsProcessing(id);
		return this.orderRepository.findById(id);
	}

	async updateStatusReady(id: number): Promise<Order> {
		await this.validateOrderAndStatus(id, OrderStatus.PROCESSING);
		await this.orderRepository.updateStatus(id, OrderStatus.READY);
		this.notifyOrder.emitOrderIsReady(id);
		return this.orderRepository.findById(id);
	}

	async updateStatusFinished(id: number): Promise<Order> {
		await this.validateOrderAndStatus(id, OrderStatus.READY);
		await this.orderRepository.updateStatus(id, OrderStatus.FINISHED);
		await this.orderRepository.updateFinishedAt(id);
		return this.orderRepository.findById(id);
	}

	async updateStatusReceived(id: number): Promise<Order> {
		await this.validateOrderAndStatus(id, OrderStatus.AWAITING_PAYMENT);
		await this.orderRepository.updateStatus(id, OrderStatus.RECEIVED);
		await this.orderRepository.updateFinishedAt(id);
		return this.orderRepository.findById(id);
	}
}
