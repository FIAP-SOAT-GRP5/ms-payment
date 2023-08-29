import * as mercadopago from 'mercadopago';
import PaymentStatusDto from '../../dtos/payment-status.dto';
import { Order } from '../../entities/order.entity';
import { InvalidOrderStatusError } from '../../errors/invalid-order-status.error';
import { OrderNotFoundError } from '../../errors/order-not-found.error';
import { INotifyOrderGateway } from '../../interfaces/order/notify-order.gateway.interface';
import { IOrderGateway } from '../../interfaces/order/order.gateway.interface';
import { IUpdateOrderPaymentUseCase } from '../../interfaces/order/update-order-payment.use-case.interface';
import { OrderStatus } from '../../value-objects/order-status';
import { PaymentStatus } from '../../value-objects/payment-status';

export class UpdateOrderPaymentUseCase
	implements IUpdateOrderPaymentUseCase {
	constructor(
		private readonly orderGateway: IOrderGateway,
		private readonly notifyOrderGateway: INotifyOrderGateway
	) {}

	private async validateOrderAndStatus(
		id: number,
		...status: OrderStatus[]
	): Promise<void> {
		const order = await this.orderGateway.findById(id);
		if (!order) throw new OrderNotFoundError();
		if (!status.includes(order.status))
			throw new InvalidOrderStatusError(...status);
	}

	private async validateOrder(
		id: number
	): Promise<void> {
		const order = await this.orderGateway.findById(id);
		if (!order) throw new OrderNotFoundError();
	}

	async updateOrderStatusAndPaymentStatus({
		id,
		paymentStatus,
	}: PaymentStatusDto): Promise<Order> {
		const pagamento = mercadopago.payment.get(id);
		console.log(pagamento)
		await this.validateOrderAndStatus(id, OrderStatus.AWAITING_PAYMENT);
		this.orderGateway.updateStatusAndPaymentStatus(id, paymentStatus);
		return this.orderGateway.findById(id);
	}

	async updateOrderPaymentStatusProcessing(id: number): Promise<Order> {
		await this.validateOrder(id);
		this.orderGateway.updateStatusAndPaymentStatus(id, PaymentStatus.PROCESSING);
		this.notifyOrderGateway.emitOrderIsProcessing(id);
		return this.orderGateway.findById(id);
	}

	async updateOrderPaymentStatusApproved(id: number): Promise<Order> {
		await this.validateOrder(id);
		await this.orderGateway.updateStatusAndPaymentStatus(id, PaymentStatus.APPROVED);
		return this.orderGateway.findById(id);
	}

	async updateOrderPaymentStatusRefused(id: number): Promise<Order> {
		await this.validateOrder(id);
		this.orderGateway.updateStatusAndPaymentStatus(id, PaymentStatus.REFUSED);
		return this.orderGateway.findById(id);
	}

}
