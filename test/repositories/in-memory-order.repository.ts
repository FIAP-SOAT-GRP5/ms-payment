import { IOrderGateway } from "../../src/domain/application/interfaces/Order/order.gateway.interface";
import { OrderToCreateDto } from "../../src/domain/enterprise/dtos/order-to-create.dto";
import { Item } from "../../src/domain/enterprise/entities/item.entity";
import { OrderItem } from "../../src/domain/enterprise/entities/order-item.entity";
import { Order } from "../../src/domain/enterprise/entities/order.entity";

export class InMemoryOrderRepository implements IOrderGateway {
	orders: Order[] = [];

	private generateId(): number {
		const findBiggestId = () => {
			let biggestId = 0;
			for (const order of this.orders) {
				if (order.id > biggestId) {
					biggestId = order.id;
				}
			}
			return biggestId;
		}
		return findBiggestId() + 1;
	}

	async create(orderToCreate: OrderToCreateDto): Promise<Order> {
		const order = new Order();
		order.id = this.generateId();
		order.status = orderToCreate.status;
		order.client_id = orderToCreate.client.id;
		order.orderItems = orderToCreate.orderItems.map(oi => {
			const orderItem = new OrderItem();
			orderItem.price = oi.price;
			orderItem.quantity = oi.quantity;
			const item = new Item();
			item.id = oi.item.id;
			item.name = oi.item.name;
			orderItem.item = item;
			return orderItem;
		});

		this.orders.push(order);
		return order;
	}

	async findById(id: number): Promise<Order> {
		const order = this.orders.find(o => o.id === id);
		return order;
	}

	async listAllOrders(): Promise<Order[]> {
		return this.orders;
	}

}
