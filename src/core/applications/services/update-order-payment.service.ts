import { CheckoutRepository } from './../../../adapter/checkout/driven/checkout.repository';
import PaymentStatusDto from 'src/adapter/checkout/dtos/payment-status.dto';

import { IUpdateOrderStatusAndPaymentStatusService } from '../interfaces/update-order-status-payment-status.service.interface';

export class UpdateOrderStatusAndPaymentStatus
	implements IUpdateOrderStatusAndPaymentStatusService
{
	constructor(private readonly configheckoutRepository: CheckoutRepository) {}

	async updateOrderStatusAndPaymentStatus({
		id,
		paymentStatus,
	}: PaymentStatusDto): Promise<boolean> {
		await this.configheckoutRepository.updateOrderStatusAndPaymentStatus({
			id,
			paymentStatus,
		});
		return true;
	}
}
