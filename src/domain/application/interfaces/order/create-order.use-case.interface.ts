/* v8 ignore start */
import { CreatedPaymentDto } from "@/domain/enterprise/dtos/create-payment.dto";
import { CreateOrderDto } from "../../../enterprise/dtos/create-order.dto";
import { Order } from "../../../enterprise/entities/order.entity";

export interface ICreateOrderUseCase {
	create(dto: CreateOrderDto): Promise<Order>;
}
/* v8 ignore stop */