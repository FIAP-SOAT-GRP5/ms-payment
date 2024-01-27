/* v8 ignore start */
import { Order } from "../../../enterprise/entities/order.entity";

export interface IGetOrderUseCase {
	findOrderById(id: number): Promise<Order>;
	listAllOrders(): Promise<Order[]>;
	getProcessingOrders(): Promise<Order[]>;
	getApprovedOrders(): Promise<Order[]>;
	getRefusedOrders(): Promise<Order[]>;
}
/* v8 ignore stop */