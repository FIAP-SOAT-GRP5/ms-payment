
import { OrderToCreateDto } from '../../dtos/order-to-create.dto';
import { Order } from '../../entities/order.entity';
import { IOrderRepository } from '../../interfaces/order/order-repository.interface';
import { IOrderGateway } from '../../interfaces/order/order.gateway.interface';

export class OrderGateway implements IOrderGateway {
	constructor(
		private readonly orderRepository: IOrderRepository
	) {}

	async create(orderToCreate: OrderToCreateDto): Promise<Order> {
		return this.orderRepository.save(orderToCreate).then((order) => {
			return this.findById(order.id);
		});
	}

	findById(id: number): Promise<Order> {
		return this.orderRepository.findById(id);
	}

	listAllOrders(): Promise<Order[]> {
		return this.orderRepository.listAllOrders();
	}

}
