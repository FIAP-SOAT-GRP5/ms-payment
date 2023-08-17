import { UpdateOrderStatusAndPaymentStatus } from 'src/core/applications/services/update-order-payment.service';
import { IUpdateOrderStatusAndPaymentStatusService } from 'src/core/applications/interfaces/update-order-status-payment-status.service.interface';

import { CheckoutRepository } from '../driven/checkout.repository';

export const buildUpdatePaymentService = (
	repositoryCheckoutPort: CheckoutRepository
): IUpdateOrderStatusAndPaymentStatusService =>
	new UpdateOrderStatusAndPaymentStatus(repositoryCheckoutPort);
