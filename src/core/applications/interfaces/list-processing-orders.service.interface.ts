import { Order } from "../../domain/order.entity";

export interface IListProcessingOrdersService {
	listProcessingOrders(): Promise<Order[]>;
}