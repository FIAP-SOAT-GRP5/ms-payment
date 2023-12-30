import { OrderItem } from '../entities/order-item.entity';
import { OrderStatus } from '../value-objects/order-status';

export class CreateOrderResponse {
	id: number;
	status: OrderStatus;
	finishedAt: Date;
	createdAt: Date;
	updatedAt: Date;
	client_id: number;
	orderItems?: OrderItem[];

}
