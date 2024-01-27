import { OrderStatus } from '../value-objects/order-status';

class ClientDto {
	id: number;
}

class ItemDto {
	id: number;
	name: string;
}

class OrderItemsDto {
	price: number;
	quantity: number;
	item: ItemDto;
}

class OrderDto {
	id: number;
	status: OrderStatus;
	client: ClientDto;
	orderItems: OrderItemsDto[];
}

export class CreateOrderDto {
	order: OrderDto;
	clientId: number;
}