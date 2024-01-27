import { CreateOrderDto, OrderStatus } from "../../src/domain/enterprise/dtos/create-order.dto"

export function makeOrderToCreate() {
	const order = new CreateOrderDto()
	order.id = 1,
		order.status = OrderStatus.AWAITING_PAYMENT
	order.client_id = 'some_client_id'
	order.orderItems = [
		{
			price: 10,
			quantity: 1,
			item: {
				id: 1,
				name: 'some_item_name'
			}
		}
	]
	return order
}
