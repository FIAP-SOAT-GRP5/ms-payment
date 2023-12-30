import { CreateOrderResponse } from '../dtos/create-order-response.dto';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../entities/order.entity';
import { ICreateOrderUseCase } from '../interfaces/order/create-order.use-case.interface';
import { IGetOrderUseCase } from '../interfaces/order/get-order.use-case.interface';

export class OrderController {
	constructor(
		private readonly createOrderUseCase: ICreateOrderUseCase,
		private readonly getOrderUseCase: IGetOrderUseCase,
	) {}

	public async listAllOrders(): Promise<Order[]> {
		return this.getOrderUseCase.listAllOrders();
	}

	public async findById(id: number): Promise<Order> {
		return this.getOrderUseCase.findById(id);
	}

	public async create(body: CreateOrderDto): Promise<CreateOrderResponse> {
		return this.createOrderUseCase.create(body);
	}
}
