import { ICheckoutGateway } from '../../interfaces/checkout/checkout.gateway.interface';
import { ICreateOrderUseCase } from '../../interfaces/order/create-order.use-case.interface';
import { IOrderRepository } from '../../interfaces/order/order-repository.interface';
import { IQueueGateway } from '../../interfaces/queue/queue.gateway.interface';
import { CreateOrderUseCase } from '../../use-cases/order/create-order.use-case';

export const buildCreateOrderUseCase = (
	repository: IOrderRepository,
	checkoutGateway: ICheckoutGateway,
	queueGateway: IQueueGateway,
): ICreateOrderUseCase => {
	return new CreateOrderUseCase(repository, checkoutGateway, queueGateway);
};
