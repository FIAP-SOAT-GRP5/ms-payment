/* v8 ignore start */
import { CreateOrderDto } from "../../../enterprise/dtos/create-order.dto";

export interface ICreateOrderUseCase {
	create(dto: CreateOrderDto): Promise<void>;
}
/* v8 ignore stop */