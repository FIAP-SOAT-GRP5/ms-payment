import { Order } from '../../entities/order.entity';

export interface IUpdateOrderStatusUseCase {
	updateStatusReceived(id: number): Promise<Order>;
	updateStatusProcessing(id: number): Promise<Order>;
	updateStatusReady(id: number): Promise<Order>;
	updateStatusFinished(id: number): Promise<Order>;
	updateStatusFinished(id: number): Promise<Order>;
}
