import { Order } from '../entities/order.entity';

export class CreatedPaymentDto {
	order: Order;
	paymentUrl: string;
}
