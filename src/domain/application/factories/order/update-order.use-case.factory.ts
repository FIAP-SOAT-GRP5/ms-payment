import { IOrderRepository } from '../../interfaces/order/order-repository.interface';
import { IPaymentOrderUseCase } from '../../interfaces/order/payment-order.use-case.interface';
import { IPaymentQueueGateway } from '../../interfaces/order/payment-queue.gateway.interface';
import { IUpdateOrderUseCase } from '../../interfaces/order/update-order.use-case.interface';
import { UpdateOrderUseCase } from '../../use-cases/order/update-order.use-case';

export const buildUpdateOrderUseCase = (
	repository: IOrderRepository,
	payment: IPaymentOrderUseCase,
	paymentApprovedQueue: IPaymentQueueGateway,
): IUpdateOrderUseCase => {
	return new UpdateOrderUseCase(repository, payment, paymentApprovedQueue);
};
