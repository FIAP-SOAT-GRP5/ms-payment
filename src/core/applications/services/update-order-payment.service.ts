import { IOrderRepositoryPort } from '../ports/order-repository.port';
import { INotifyOrderPort } from '../ports/notify-order.port';

import { IUpdateOrderStatusAndPaymentStatusService } from '../interfaces/update-order-status-payment-status.service.interface';
import { Order } from 'src/core/domain/order.entity';

import PaymentStatusDto from 'src/adapter/checkout/dtos/payment-status.dto';
import { OrderStatus } from 'src/core/value-objects/order-status';

import { OrderNotFoundError } from 'src/core/errors/order-not-found.error';
import { InvalidOrderStatusError } from 'src/core/errors/invalid-order-status.error';
import { PaymentStatus } from 'src/core/value-objects/payment-status';
import * as mercadopago from 'mercadopago';
import { InvalidOrderPaymentStatusError } from 'src/core/errors/invalid-order-payment-status.error';

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

	private async validateOrder(
		id: number
	): Promise<void> {
		const order = await this.orderRepository.findById(id);
		if (!order) throw new OrderNotFoundError();
	}

	async updateOrderStatusAndPaymentStatus({
		id,
		paymentStatus,
	}: PaymentStatusDto): Promise<Order> {
		const pagamento = mercadopago.payment.get(id);
		console.log(pagamento)
		await this.validateOrderAndStatus(id, OrderStatus.AWAITING_PAYMENT);
		this.orderRepository.updateStatusAndPaymentStatus(id, paymentStatus);
		return this.orderRepository.findById(id);
	}

	async updateOrderPaymentStatusProcessing(id: number): Promise<Order> {
		await this.validateOrder(id);
		this.orderRepository.updateStatusAndPaymentStatus(id, PaymentStatus.PROCESSING);
		return this.orderRepository.findById(id);
	}

	async updateOrderPaymentStatusApproved(id: number): Promise<Order> {
		await this.validateOrder(id);
		await this.orderRepository.updateStatusAndPaymentStatus(id, PaymentStatus.APPROVED);
		return this.orderRepository.findById(id);
	}

	async updateOrderPaymentStatusRefused(id: number): Promise<Order> {
		await this.validateOrder(id);
		this.orderRepository.updateStatusAndPaymentStatus(id, PaymentStatus.REFUSED);
		return this.orderRepository.findById(id);
	}

}
