import PaymentStatusDto from 'src/adapter/checkout/dtos/payment-status.dto';
import { OrderToCreateDto } from 'src/core/dtos/order-to-create.dto';

export interface ICheckoutPort {
	doPayment(id: number, dataOrder: OrderToCreateDto): Promise<void>;
	updateOrderStatusAndPaymentStatus(
		paymentStatusDto: PaymentStatusDto
	): Promise<boolean>;
}
