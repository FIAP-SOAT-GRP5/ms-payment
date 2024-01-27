import { Order } from "../../../enterprise/entities/order.entity";
import { IGetOrderUseCase } from "../../interfaces/order/get-order.use-case.interface";
import { IOrderRepository } from "../../interfaces/order/order-repository.interface";

export class GetOrderUseCase implements IGetOrderUseCase {
	constructor(private readonly repository: IOrderRepository) {}
	findOrderById(id: number): Promise<Order> {
		return this.repository.findOrderById(id);
	}
	listAllOrders(): Promise<Order[]> {
		return this.repository.listAllOrders();
	}
	getProcessingOrders(): Promise<Order[]> {
		return this.repository.getProcessingOrders();
	}
	getApprovedOrders(): Promise<Order[]>{
		return this.repository.getApprovedOrders();
	}
	getRefusedOrders(): Promise<Order[]> {
		return this.repository.getRefusedOrders();
	}
	
}
