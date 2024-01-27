import { IGetOrderUseCase } from '../../interfaces/order/get-order.use-case.interface';
import { IOrderRepository } from '../../interfaces/order/order-repository.interface';
import { IPaymentOrderUseCase } from '../../interfaces/order/payment-order.use-case.interface';
import { IUpdateOrderUseCase } from '../../interfaces/order/update-order.use-case.interface';
import { GetOrderUseCase } from '../../use-cases/order/get-order.use-case';
import { UpdateOrderUseCase } from '../../use-cases/order/update-order.use-case';

export const buildUpdateOrderUseCase = (
	repository: IOrderRepository,
	payment: IPaymentOrderUseCase
): IUpdateOrderUseCase => {
	return new UpdateOrderUseCase(repository, payment);
};
