import { INotifyOrderPort } from '../../../core/applications/ports/notify-order.port';
import { IOrderRepositoryPort } from '../../../core/applications/ports/order-repository.port';
import { IUpdateOrderStatusAndPaymentStatusService } from 'src/core/applications/interfaces/update-order-status-payment-status.service.interface';
import { UpdateOrderStatusAndPaymentStatusService } from 'src/core/applications/services/update-order-payment.service';

export const buildUpdateOrderPaymentStatusService = (
	repository: IOrderRepositoryPort,
	notifyOrder: INotifyOrderPort
): IUpdateOrderStatusAndPaymentStatusService => {
	return new UpdateOrderStatusAndPaymentStatusService(repository, notifyOrder);
};
