import { OrderStatusPayment } from '../value-objects/order-status-payment';

export class OrderToCreateDto {
	id: number;
	status_payment: OrderStatusPayment;
}
