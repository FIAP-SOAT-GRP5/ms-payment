import { Order } from '../entities/order.entity';
import { OrderDto } from './create-order.dto';

export class CreatedPaymentDto {
	order: OrderDto;
	paymentUrl: string;
}
