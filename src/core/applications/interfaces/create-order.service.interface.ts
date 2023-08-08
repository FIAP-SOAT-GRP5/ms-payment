import { Order } from "../../domain/order.entity";
import { CreateOrderDto } from "../../dtos/create-order.dto";

export interface ICreateOrderService {
	create(dto: CreateOrderDto): Promise<Order>;
}