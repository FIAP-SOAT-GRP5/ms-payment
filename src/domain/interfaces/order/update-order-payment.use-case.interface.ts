import PaymentStatusDto from "../../dtos/payment-status.dto";
import { Order } from "../../entities/order.entity";

export interface IUpdateOrderPaymentUseCase {
	updateOrderStatusAndPaymentStatus(ipaymentStatusDto: PaymentStatusDto): Promise<Order>;
	updateOrderPaymentStatusProcessing(id: number): Promise<Order>;
	updateOrderPaymentStatusApproved(id: number): Promise<Order>;
	updateOrderPaymentStatusRefused(id: number): Promise<Order>;
}
