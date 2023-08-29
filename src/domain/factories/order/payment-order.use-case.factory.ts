import { ICheckoutGateway } from '../../interfaces/checkout/checkout.gateway.interface';
import { IPaymentOrderUseCase } from '../../interfaces/order/payment-order.use-case.interface';
import { PaymentOrderUseCase } from '../../use-cases/order/payment-order.use-case';

export const buildPaymentOrderUseCase = (
	checkoutGateway: ICheckoutGateway,
): IPaymentOrderUseCase => {
	return new PaymentOrderUseCase(checkoutGateway);
};
