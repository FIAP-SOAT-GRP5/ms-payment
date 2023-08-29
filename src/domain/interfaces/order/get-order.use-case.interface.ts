import { Order } from "../../entities/order.entity";

export interface IGetOrderUseCase {
	findById(id: number): Promise<Order>;
	listProcessingOrders(): Promise<Order[]>;
	listAllOrders(): Promise<Order[]>;
}