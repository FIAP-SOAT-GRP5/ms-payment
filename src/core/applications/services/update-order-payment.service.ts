import { IOrderRepositoryPort } from '../ports/order-repository.port';
import { INotifyOrderPort } from '../ports/notify-order.port';

import { IUpdateOrderStatusAndPaymentStatusService } from '../interfaces/update-order-status-payment-status.service.interface';
import { Order } from 'src/core/domain/order.entity';

import PaymentStatusDto from 'src/adapter/checkout/dtos/payment-status.dto';
import { OrderStatus } from 'src/core/value-objects/order-status';

import { OrderNotFoundError } from 'src/core/errors/order-not-found.error';
import { InvalidOrderStatusError } from 'src/core/errors/invalid-order-status.error';

export class UpdateOrderStatusAndPaymentStatusService
	implements IUpdateOrderStatusAndPaymentStatusService
{
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

	async updateOrderStatusAndPaymentStatus({
		id,
		paymentStatus,
	}: PaymentStatusDto): Promise<Order> {
		await this.validateOrderAndStatus(id, OrderStatus.AWAITING_PAYMENT);
		this.orderRepository.updateStatusAndPaymentStatus(id, paymentStatus);
		return this.orderRepository.findById(id);
	}
}
