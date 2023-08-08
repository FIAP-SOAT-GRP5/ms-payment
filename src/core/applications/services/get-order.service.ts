import { Order } from "../../domain/order.entity";
import { IGetOrderService } from "../interfaces/get-order.service.interface";
import { IOrderRepositoryPort } from "../ports/order-repository.port";

export class GetOrderService implements IGetOrderService {
	constructor(private readonly orderRepository: IOrderRepositoryPort) {}
	findById(id: number): Promise<Order> {
		return this.orderRepository.findById(id);
	}
}
