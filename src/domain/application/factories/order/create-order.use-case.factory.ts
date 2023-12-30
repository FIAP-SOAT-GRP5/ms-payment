import { IGetItemUseCase } from '../../interfaces/Item/get-item.use-case.interface';
import { ICreateOrderUseCase } from '../../interfaces/order/create-order.use-case.interface';
import { IOrderGateway } from '../../interfaces/order/order.gateway.interface';
import { CreateOrderUseCase } from '../../use-cases/order/create-order.use-case';

export const buildCreateOrderUseCase = (
	repository: IOrderGateway,
	getItemService: IGetItemUseCase,
): ICreateOrderUseCase => {
	return new CreateOrderUseCase(repository, getItemService);
};
