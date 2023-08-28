import { OrderStatus } from "../value-objects/order-status";

export class InvalidOrderStatusError extends Error {
	constructor(...status: OrderStatus[]) {
		super(`Order status must be one of the following: ${status.join(', ')}`);
	}
}