import { OrderStatusPayment } from "@/domain/enterprise/value-objects/order-status-payment";
import { IOrderRepository } from "../../src/domain/application/interfaces/order/order-repository.interface";
import { OrderToCreateDto } from "../../src/domain/enterprise/dtos/order-to-create.dto";
import { Order } from "../../src/domain/enterprise/entities/order.entity";

export class InMemoryOrderRepository implements IOrderRepository {
	orders: Order[] = [];

	private generateId(): number {
		const findBiggestId = () => {
			let biggestId = 0;
			for (const order of this.orders) {
				if (order.getId() > biggestId) {
					biggestId = order._id;
				}
			}
			return biggestId;
		}
		return findBiggestId() + 1;
	}

	async create(orderToCreate: OrderToCreateDto): Promise<Order> {
		const order = new Order();
		order._id = this.generateId();
		order.status_payment = OrderStatusPayment.PROCESSING
		this.orders.push(order);
		return order;
	}

	async findOrderById(id: number): Promise<Order> {
		const order = this.orders.find(o => o._id === id);
		return order;
	}

	async listAllOrders(): Promise<Order[]> {
		return this.orders;
	}

	async getProcessingOrders(): Promise<Order[]> {
		return this.orders.filter((order) => order.status_payment === OrderStatusPayment.PROCESSING)
	}

	async getApprovedOrders(): Promise<Order[]> {
		return this.orders.filter((order) => order.status_payment === OrderStatusPayment.APPROVED)
	}

	async getRefusedOrders(): Promise<Order[]> {
		return this.orders.filter((order) => order.status_payment === OrderStatusPayment.REFUSED)
	}

	async updateOrderStatusPaymentApproved(id: number): Promise<Order> {
		const orderToUpdate = await this.findOrderById(id);
		if (!orderToUpdate) return;
		orderToUpdate.status_payment = OrderStatusPayment.APPROVED
		return orderToUpdate;
	}

	async updateOrderStatusPaymentRefused(id: number): Promise<Order> {
		const orderToUpdate = await this.findOrderById(id);
		if (!orderToUpdate) return;
		orderToUpdate.status_payment = OrderStatusPayment.APPROVED
		return orderToUpdate;
	}

}
