import { OrderController } from "../../controllers/order.controller";
import { ICreateOrderUseCase } from "../../interfaces/order/create-order.use-case.interface";
import { IGetOrderUseCase } from "../../interfaces/order/get-order.use-case.interface";
import { IPaymentOrderUseCase } from "../../interfaces/order/payment-order.use-case.interface";
import { IUpdateOrderPaymentUseCase } from "../../interfaces/order/update-order-payment.use-case.interface";
import { IUpdateOrderStatusUseCase } from "../../interfaces/order/update-order-status.use-case.interface";

export const buildOrderController = (
	createOrderUseCase: ICreateOrderUseCase,
	getOrderUseCase: IGetOrderUseCase,
	updateOrderStatusUseCase: IUpdateOrderStatusUseCase,
	updateOrderPaymentUseCase: IUpdateOrderPaymentUseCase,
	paymentOrderUseCase: IPaymentOrderUseCase
): OrderController => {
	return new OrderController(
		createOrderUseCase,
		getOrderUseCase,
		updateOrderStatusUseCase,
		updateOrderPaymentUseCase,
		paymentOrderUseCase
	);
}