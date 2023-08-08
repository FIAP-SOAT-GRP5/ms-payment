export interface ICheckoutPort {
	doPayment(id: number): Promise<void>;
}