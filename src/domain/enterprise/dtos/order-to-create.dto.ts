/* v8 ignore start */
import { OrderStatusPayment } from '../value-objects/order-status-payment';

export class OrderToCreateDto {
	orderOrigin_id: number;
	status_payment: OrderStatusPayment;
	payment_url: string;
}
/* v8 ignore stop */