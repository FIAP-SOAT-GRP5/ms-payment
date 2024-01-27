/* v8 ignore start */
import { OrderToCreateDto } from "../../../enterprise/dtos/order-to-create.dto";
import { Order } from "../../../enterprise/entities/order.entity";

export interface IOrderRepository {
	create(orderToCreate: OrderToCreateDto): Promise<Order>;
	updateOrderStatusPaymentApproved(id: number): Promise<Order>;
	updateOrderStatusPaymentRefused(id: number): Promise<Order>;
}
/* v8 ignore stop */