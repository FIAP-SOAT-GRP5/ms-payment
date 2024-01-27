import { OrderDto } from "@/domain/enterprise/dtos/create-order.dto";

export interface IPaymentUrl {
	paymentUrl: string;
}

export interface IPaymentData {
	order_id: number;
	status: "approved" | "rejected";
}

export interface ICheckoutGateway {
	doPayment(id: number, dataOrder: OrderDto): Promise<IPaymentUrl>;
	getPayment(id: number): Promise<IPaymentData>;
}
