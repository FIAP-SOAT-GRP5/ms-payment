import { OrderToCreateDto } from "../../dtos/order-to-create.dto";

export interface IPaymentUrl {
	paymentUrl: string;
}

export interface ICheckoutGateway {
	doPayment(id: number, dataOrder: OrderToCreateDto): Promise<IPaymentUrl>;
}
