import { ICheckoutGateway, IPaymentData } from "../../interfaces/checkout/checkout.gateway.interface";
import { IPaymentOrderUseCase } from "../../interfaces/order/payment-order.use-case.interface";

export class PaymentOrderUseCase implements IPaymentOrderUseCase {
	constructor(
		private readonly checkoutGateway: ICheckoutGateway,
	) {}

	async getPayment(id: number): Promise<IPaymentData> {
		return this.checkoutGateway.getPayment(id);
	}
}
