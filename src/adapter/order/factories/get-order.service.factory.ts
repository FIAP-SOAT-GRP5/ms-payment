import { IGetOrderService } from '../../../core/applications/interfaces/get-order.service.interface';
import { IOrderRepositoryPort } from '../../../core/applications/ports/order-repository.port';
import { GetOrderService } from '../../../core/applications/services/get-order.service';

export const buildGetOrderService = (
	repository: IOrderRepositoryPort
): IGetOrderService => {
	return new GetOrderService(repository);
};
