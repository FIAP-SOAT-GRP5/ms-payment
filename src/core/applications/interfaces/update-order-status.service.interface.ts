import { Order } from "../../domain/order.entity";

export interface IUpdateOrderStatusService {
	updateStatusProcessing(id: number): Promise<Order>;
	updateStatusReady(id: number): Promise<Order>;
	updateStatusFinished(id: number): Promise<Order>;
}