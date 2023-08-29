import { Order } from '../../entities/order.entity';
import { InvalidOrderStatusError } from '../../errors/invalid-order-status.error';
import { OrderNotFoundError } from '../../errors/order-not-found.error';
import { INotifyOrderGateway } from '../../interfaces/order/notify-order.gateway.interface';
import { IOrderGateway } from '../../interfaces/order/order.gateway.interface';
import { IUpdateOrderStatusUseCase } from '../../interfaces/order/update-order-status.use-case.interface';
import { OrderStatus } from '../../value-objects/order-status';

export class UpdateOrderStatusService implements IUpdateOrderStatusUseCase {
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

	async updateStatusProcessing(id: number): Promise<Order> {
		await this.validateOrderAndStatus(id, OrderStatus.RECEIVED);
		await this.orderGateway.updateStatus(id, OrderStatus.PROCESSING);
		this.notifyOrderGateway.emitOrderIsProcessing(id);
		return this.orderGateway.findById(id);
	}

	async updateStatusReady(id: number): Promise<Order> {
		await this.validateOrderAndStatus(id, OrderStatus.PROCESSING);
		await this.orderGateway.updateStatus(id, OrderStatus.READY);
		this.notifyOrderGateway.emitOrderIsReady(id);
		return this.orderGateway.findById(id);
	}

	async updateStatusFinished(id: number): Promise<Order> {
		await this.validateOrderAndStatus(id, OrderStatus.READY);
		await this.orderGateway.updateStatus(id, OrderStatus.FINISHED);
		await this.orderGateway.updateFinishedAt(id);
		return this.orderGateway.findById(id);
	}

	async updateStatusReceived(id: number): Promise<Order> {
		await this.validateOrderAndStatus(id, OrderStatus.AWAITING_PAYMENT);
		await this.orderGateway.updateStatus(id, OrderStatus.RECEIVED);
		await this.orderGateway.updateFinishedAt(id);
		return this.orderGateway.findById(id);
	}
}
