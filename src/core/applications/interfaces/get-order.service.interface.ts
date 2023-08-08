import { Order } from "../../domain/order.entity";

export interface IGetOrderService {
	findById(id: number): Promise<Order>;
}