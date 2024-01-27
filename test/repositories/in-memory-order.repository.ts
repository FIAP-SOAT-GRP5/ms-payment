import { OrderStatusPayment } from "@/domain/enterprise/value-objects/order-status-payment";
import { IOrderRepository } from "../../src/domain/application/interfaces/order/order-repository.interface";
import { OrderToCreateDto } from "../../src/domain/enterprise/dtos/order-to-create.dto";
import { Order } from "../../src/domain/enterprise/entities/order.entity";

export class InMemoryOrderRepository implements IOrderRepository {
	orders: Order[] = [];

	async create(orderToCreate: OrderToCreateDto): Promise<Order> {
		const order = new Order();
		order._id = 'some_id';
		order.orderOrigin_id = orderToCreate.orderOrigin_id;
		order.status_payment = OrderStatusPayment.PROCESSING
		this.orders.push(order);
		return order;
	}

	async updateOrderStatusPaymentApproved(id: number): Promise<Order> {
		const orderToUpdate = this.orders.find(order => order.orderOrigin_id === id);
		if (!orderToUpdate) return;
		orderToUpdate.status_payment = OrderStatusPayment.APPROVED
		return orderToUpdate;
	}

	async updateOrderStatusPaymentRefused(id: number): Promise<Order> {
		const orderToUpdate = this.orders.find(order => order.orderOrigin_id === id);
		if (!orderToUpdate) return;
		orderToUpdate.status_payment = OrderStatusPayment.REFUSED
		return orderToUpdate;
	}

}
