import { IUpdateOrderPaymentUseCase } from 'src/domain/interfaces/order/update-order-payment.use-case.interface';
import { UpdateOrderPaymentUseCase } from 'src/domain/use-cases/order/update-order-payment.use-case';
import { INotifyOrderGateway } from '../../interfaces/order/notify-order.gateway.interface';
import { IOrderGateway } from '../../interfaces/order/order.gateway.interface';

export const buildUpdateOrderPaymentUseCase = (
	repository: IOrderGateway,
	notifyOrder: INotifyOrderGateway
): IUpdateOrderPaymentUseCase => {
	return new UpdateOrderPaymentUseCase(repository, notifyOrder);
};
