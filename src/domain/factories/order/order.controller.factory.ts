import { OrderController } from "../../controllers/order.controller";
import { ICreateOrderUseCase } from "../../interfaces/order/create-order.use-case.interface";
import { IGetOrderUseCase } from "../../interfaces/order/get-order.use-case.interface";

export const buildOrderController = (
	createOrderUseCase: ICreateOrderUseCase,
	getOrderUseCase: IGetOrderUseCase,
): OrderController => {
	return new OrderController(
		createOrderUseCase,
		getOrderUseCase,
	);
}