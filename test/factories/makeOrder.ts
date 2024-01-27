import { OrderStatusPayment } from "@/domain/enterprise/value-objects/order-status-payment"
import { OrderToCreateDto } from "../../src/domain/enterprise/dtos/order-to-create.dto"

export function makeOrderToCreate() {
	const order = new OrderToCreateDto()
	order.id = 1,
	order.status_payment = OrderStatusPayment.PROCESSING
	return order
}
