import { Order } from "../../../enterprise/entities/order.entity";
import { IRepository } from "../repository.interface";

export interface IOrderRepository extends IRepository<Order> {
	listProcessingOrders(): Promise<Order[]>;
	listAllOrders(): Promise<Order[]>;
}