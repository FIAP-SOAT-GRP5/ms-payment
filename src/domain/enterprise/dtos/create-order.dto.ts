export enum OrderStatus {
	AWAITING_PAYMENT = 'awaiting_payment',
	RECEIVED = 'received',
	PROCESSING = 'processing',
	READY = 'ready',
	FINISHED = 'finished',
	CANCELED = 'canceled',
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

export class CreateOrderDto {
	id: number;
	status: OrderStatus;
	client_id: string;
	orderItems: OrderItemsDto[];
}