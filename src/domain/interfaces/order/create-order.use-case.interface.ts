import { CreateOrderResponse } from "../../dtos/create-order-response.dto";
import { CreateOrderDto } from "../../dtos/create-order.dto";

export interface ICreateOrderUseCase {
	create(dto: CreateOrderDto): Promise<CreateOrderResponse>;
}