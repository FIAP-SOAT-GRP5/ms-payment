import { IGetItemUseCase } from '../../interfaces/Item/get-item.use-case.interface';
import { ICreateOrderUseCase } from '../../interfaces/order/create-order.use-case.interface';
import { IOrderRepository } from '../../interfaces/order/order-repository.interface';
import { CreateOrderUseCase } from '../../use-cases/order/create-order.use-case';

export const buildCreateOrderUseCase = (
	repository: IOrderRepository,
	getItemService: IGetItemUseCase,
): ICreateOrderUseCase => {
	return new CreateOrderUseCase(repository, getItemService);
};
