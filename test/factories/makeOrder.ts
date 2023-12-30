import { OrderToCreateDto } from "../../src/domain/dtos/order-to-create.dto"

export function makeOrderToCreate() {
	const order = new OrderToCreateDto()
	order.client = {
		id: 1,
	}
	order.orderItems = []
	return order
}
