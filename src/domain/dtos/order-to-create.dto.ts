import { OrderStatus } from '../value-objects/order-status';
import { PaymentStatus } from '../value-objects/payment-status';

class OrderItemToCreateDto {
	price: number;
	quantity: number;
	item: { id: number, name: string };
}

export class OrderToCreateDto {
	status: OrderStatus;
	status_payment: PaymentStatus;
	client: { id: number };
	orderItems?: OrderItemToCreateDto[];
}
