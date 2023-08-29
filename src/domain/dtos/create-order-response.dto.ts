import { Client } from '../entities/client.entity';
import { OrderItem } from '../entities/order-item.entity';
import { OrderStatus } from '../value-objects/order-status';
import { PaymentStatus } from '../value-objects/payment-status';

export class CreateOrderResponse {
	id: number;
	status: OrderStatus;
	status_payment: PaymentStatus;
	finishedAt: Date;
	createdAt: Date;
	updatedAt: Date;
	client: Client;
	orderItems?: OrderItem[];
	paymentUrl: string;

}
