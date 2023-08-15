import { Order } from '../../domain/order.entity';

export interface IUpdateOrderStatusService {
	updateStatusReceived(id: number): Promise<Order>;
	updateStatusProcessing(id: number): Promise<Order>;
	updateStatusReady(id: number): Promise<Order>;
	updateStatusFinished(id: number): Promise<Order>;
	updateStatusFinished(id: number): Promise<Order>;
}
