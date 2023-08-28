import { OrderController } from "../../controllers/order.controller";
import { ICreateOrderUseCase } from "../../interfaces/order/create-order.use-case.interface";
import { IGetOrderUseCase } from "../../interfaces/order/get-order.use-case.interface";
import { IUpdateOrderPaymentUseCase } from "../../interfaces/order/update-order-payment.use-case.interface";
import { IUpdateOrderStatusUseCase } from "../../interfaces/order/update-order-status.use-case.interface";

export const buildOrderController = (
	createOrderUseCase: ICreateOrderUseCase,
	getOrderUseCase: IGetOrderUseCase,
	updateOrderStatusUseCase: IUpdateOrderStatusUseCase,
	updateOrderPaymentUseCase: IUpdateOrderPaymentUseCase
): OrderController => {
	return new OrderController(
		createOrderUseCase,
		getOrderUseCase,
		updateOrderStatusUseCase,
		updateOrderPaymentUseCase
	);
}