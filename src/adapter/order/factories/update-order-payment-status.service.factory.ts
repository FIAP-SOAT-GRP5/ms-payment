import { IUpdateOrderStatusService } from '../../../core/applications/interfaces/update-order-status.service.interface';
import { UpdateOrderStatusService } from '../../../core/applications/services/update-order-status.service';

import { INotifyOrderPort } from '../../../core/applications/ports/notify-order.port';
import { IOrderRepositoryPort } from '../../../core/applications/ports/order-repository.port';

export const buildUpdateOrderPaymentStatusService = (
	repository: IOrderRepositoryPort,
	notifyOrder: INotifyOrderPort
): IUpdateOrderStatusService => {
	return new UpdateOrderStatusService(repository, notifyOrder);
};
