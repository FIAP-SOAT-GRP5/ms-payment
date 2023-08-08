import { Order } from "../../domain/order.entity";
import { IListProcessingOrdersService } from "../interfaces/list-processing-orders.service.interface";
import { IOrderRepositoryPort } from "../ports/order-repository.port";

export class ListProcessingOrdersService implements IListProcessingOrdersService {
	constructor(private readonly orderRepository: IOrderRepositoryPort) {}
	listProcessingOrders(): Promise<Order[]> {
		return this.orderRepository.listProcessingOrders();
	}

}
