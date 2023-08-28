import { PaymentStatus } from "../value-objects/payment-status";

export class InvalidOrderPaymentStatusError extends Error {
	constructor(...status: PaymentStatus[]) {
		super(`Order's payment status must be one of the following: ${status.join(', ')}`);
	}
}