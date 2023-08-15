import { Order } from '../../domain/order.entity';
import { IOrderRepositoryPort } from '../ports/order-repository.port';
import { IListProcessingOrdersService } from '../interfaces/list-processing-orders.service.interface';

export class ListProcessingOrdersService
	implements IListProcessingOrdersService
{
	constructor(private readonly orderRepository: IOrderRepositoryPort) {}
	listAllOrders(): Promise<Order[]> {
		return this.orderRepository.listAllOrders();
	}
	listProcessingOrders(): Promise<Order[]> {
		return this.orderRepository.listProcessingOrders();
	}
}
