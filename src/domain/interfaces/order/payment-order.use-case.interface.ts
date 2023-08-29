import { IPaymentData } from "../checkout/checkout.gateway.interface";

export interface IPaymentOrderUseCase {
	getPayment(id: number): Promise<IPaymentData>;
}