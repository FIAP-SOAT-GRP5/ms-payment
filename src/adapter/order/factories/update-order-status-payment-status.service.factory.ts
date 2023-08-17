import { CheckoutRepository } from 'src/adapter/checkout/driven/checkout.repository';
import { IUpdateOrderStatusAndPaymentStatusService } from 'src/core/applications/interfaces/update-order-status-payment-status.service.interface';
import { UpdateOrderStatusAndPaymentStatus } from 'src/core/applications/services/update-order-payment.service';

export const buildUpdateOrderStatusAndPaymentStatus = (
	repository: CheckoutRepository
): IUpdateOrderStatusAndPaymentStatusService => {
	return new UpdateOrderStatusAndPaymentStatus(repository);
};
