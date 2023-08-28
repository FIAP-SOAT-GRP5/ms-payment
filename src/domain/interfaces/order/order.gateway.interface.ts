import { Order } from '../../entities/order.entity';

import { OrderToCreateDto } from '../../dtos/order-to-create.dto';

import { PaymentStatus } from 'src/domain/value-objects/payment-status';
import { OrderStatus } from '../../value-objects/order-status';

export interface IOrderGateway {
	findById(id: number): Promise<Order>;
	listAllOrders(): Promise<Order[]>;
	listProcessingOrders(): Promise<Order[]>;
	create(orderToCreate: OrderToCreateDto): Promise<Order>;
	updateStatus(id: number, status: OrderStatus): Promise<boolean>;
	updateFinishedAt(id: number): Promise<boolean>;
	updateStatusAndPaymentStatus(
		id: number,
		paymentStatus: PaymentStatus
	): Promise<boolean>;
	updateOrderPaymentStatusProcessing(id: number): Promise<Order>;
	updateOrderPaymentStatusApproved(id: any): Promise<Order>;
	updateOrderPaymentStatusRefused(id: number): Promise<Order>;
}
