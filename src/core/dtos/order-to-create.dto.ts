import { OrderStatus } from "../value-objects/order-status";

class OrderItemToCreateDto {
	price: number;
	quantity: number;
	item: { id: number };

}

export class OrderToCreateDto {
	status: OrderStatus;
	client: { id: number };
	orderItems?: OrderItemToCreateDto[];
}