/* v8 ignore start */
import { CreatedPaymentDto } from "@/domain/enterprise/dtos/created-payment.dto";
import { CreateOrderDto } from "../../../enterprise/dtos/create-order.dto";

export interface ICreateOrderUseCase {
	create(dto: CreateOrderDto): Promise<CreatedPaymentDto>;
}
/* v8 ignore stop */