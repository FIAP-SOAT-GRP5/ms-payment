import { IGetOrderUseCase } from '../../interfaces/order/get-order.use-case.interface';
import { IOrderGateway } from '../../interfaces/order/order.gateway.interface';
import { GetOrderUseCase } from '../../use-cases/order/get-order.use-case';

export const buildGetOrderUseCase = (
	repository: IOrderGateway
): IGetOrderUseCase => {
	return new GetOrderUseCase(repository);
};
