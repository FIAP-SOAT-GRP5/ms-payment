import { OrderToCreateDto } from "../../dtos/order-to-create.dto";

export interface IPaymentUrl {
	paymentUrl: string;
}

export interface IPaymentData {
	order_id: number;
	status: "approved" | "rejected";
}

export interface ICheckoutGateway {
	doPayment(id: number, dataOrder: OrderToCreateDto): Promise<IPaymentUrl>;
	getPayment(id: number): Promise<IPaymentData>;
}
