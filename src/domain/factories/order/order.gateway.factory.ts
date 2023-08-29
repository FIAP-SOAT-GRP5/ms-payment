import { OrderGateway } from "../../gateways/order/order.gateway";
import { IOrderRepository } from "../../interfaces/order/order-repository.interface";
import { IOrderGateway } from "../../interfaces/order/order.gateway.interface";

export const buildOrderGateway = (
	orderRepository: IOrderRepository
): IOrderGateway => {
	return new OrderGateway(orderRepository);
}