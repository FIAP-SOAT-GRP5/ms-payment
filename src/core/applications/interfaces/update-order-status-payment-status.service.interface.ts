import PaymentStatusDto from 'src/adapter/checkout/dtos/payment-status.dto';

export interface IUpdateOrderStatusAndPaymentStatusService {
	updateOrderStatusAndPaymentStatus(
		ipaymentStatusDto: PaymentStatusDto
	): Promise<boolean>;
}
