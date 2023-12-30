import { CreateOrderResponse } from "../../../enterprise/dtos/create-order-response.dto";
import { CreateOrderDto } from "../../../enterprise/dtos/create-order.dto";

export interface ICreateOrderUseCase {
	create(dto: CreateOrderDto): Promise<CreateOrderResponse>;
}