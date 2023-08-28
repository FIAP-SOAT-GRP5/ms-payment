import { CreateOrderDto } from "../../dtos/create-order.dto";
import { Order } from "../../entities/order.entity";

export interface ICreateOrderUseCase {
	create(dto: CreateOrderDto): Promise<Order>;
}