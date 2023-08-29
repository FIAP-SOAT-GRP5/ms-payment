import { IUpdateOrderStatusUseCase } from '../../interfaces/order/update-order-status.use-case.interface';
import { UpdateOrderStatusService } from '../../use-cases/order/update-order-status.service';

import { INotifyOrderGateway } from '../../interfaces/order/notify-order.gateway.interface';
import { IOrderGateway } from '../../interfaces/order/order.gateway.interface';

export const buildUpdateOrderStatusUseCase = (
	repository: IOrderGateway,
	notifyOrder: INotifyOrderGateway
): IUpdateOrderStatusUseCase => {
	return new UpdateOrderStatusService(repository, notifyOrder);
};
