
import { PaymentStatus } from 'src/domain/value-objects/payment-status';
import { OrderToCreateDto } from '../../dtos/order-to-create.dto';
import { Order } from '../../entities/order.entity';
import { IOrderRepository } from '../../interfaces/order/order-repository.interface';
import { IOrderGateway } from '../../interfaces/order/order.gateway.interface';
import { OrderStatus } from '../../value-objects/order-status';

export class OrderGateway implements IOrderGateway {
	constructor(
		private readonly orderRepository: IOrderRepository
	) {}

	async updateFinishedAt(id: number): Promise<boolean> {
		const exists = this.orderRepository.exists({
			id,
		});
		if (!exists) return false;
		await this.orderRepository.save({
			id,
			finishedAt: new Date(),
		});
		return true;
	}

	async updateStatus(id: number, status: OrderStatus): Promise<boolean> {
		const exists = this.orderRepository.exists({
			id,
		});
		if (!exists) return false;
		await this.orderRepository.save({
			id,
			status,
		});
		return true;
	}

	async updateStatusAndPaymentStatus(
		id: number,
		paymentStatus: PaymentStatus
	): Promise<boolean> {
		const exists = this.orderRepository.exists({
			id,
		});
		if (!exists) return false;
		await this.orderRepository.save({
			id,
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
		await this.orderRepository.save({
			id,
			status_payment: PaymentStatus.PROCESSING,
		});
		return this.findById(id);
	}

	async updateOrderPaymentStatusApproved(
		id: number
	): Promise<Order> {
		await this.orderRepository.save({
			id,
			status_payment: PaymentStatus.APPROVED,
			status: OrderStatus.RECEIVED,
		});
		return await this.findById(id);
	}

	async updateOrderPaymentStatusRefused(
		id: number
	): Promise<Order> {
		await this.orderRepository.save({
			id,
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
		return this.orderRepository.findById(id);
	}

	async listProcessingOrders(): Promise<Order[]> {
		return this.orderRepository.listProcessingOrders();
	}

	listAllOrders(): Promise<Order[]> {
		return this.orderRepository.listAllOrders();
	}

}
