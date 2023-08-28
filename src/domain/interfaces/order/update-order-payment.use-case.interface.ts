import { Order } from 'src/domain/entities/order.entity';
import PaymentStatusDto from 'src/framework/modules/checkout/dtos/payment-status.dto';

export interface IUpdateOrderPaymentUseCase {
	updateOrderStatusAndPaymentStatus(
		ipaymentStatusDto: PaymentStatusDto
	): Promise<Order>;

	updateOrderPaymentStatusProcessing(id: number): Promise<Order>;
	updateOrderPaymentStatusApproved(id: number): Promise<Order>;
	updateOrderPaymentStatusRefused(id: number): Promise<Order>;
}
