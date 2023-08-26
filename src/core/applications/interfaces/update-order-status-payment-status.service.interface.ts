import PaymentStatusDto from 'src/adapter/checkout/dtos/payment-status.dto';
import { Order } from 'src/core/domain/order.entity';

export interface IUpdateOrderStatusAndPaymentStatusService {
	updateOrderStatusAndPaymentStatus(
		ipaymentStatusDto: PaymentStatusDto
	): Promise<Order>;
	
	updateOrderPaymentStatusProcessing(id: number): Promise<Order>;
	updateOrderPaymentStatusApproved(id: any): Promise<Order>;
	updateOrderPaymentStatusRefused(id: number): Promise<Order>;
}
