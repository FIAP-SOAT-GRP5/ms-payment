import { Order } from "../../../enterprise/entities/order.entity";
import { IGetOrderUseCase } from "../../interfaces/order/get-order.use-case.interface";
import { IOrderGateway } from "../../interfaces/order/order.gateway.interface";

export class GetOrderUseCase implements IGetOrderUseCase {
	constructor(private readonly orderGateway: IOrderGateway) {}
	findById(id: number): Promise<Order> {
		return this.orderGateway.findById(id);
	}
	listAllOrders(): Promise<Order[]> {
		return this.orderGateway.listAllOrders();
	}
}
