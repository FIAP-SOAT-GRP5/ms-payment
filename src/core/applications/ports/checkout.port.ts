import { OrderToCreateDto } from 'src/core/dtos/order-to-create.dto';


export interface IPaymentUrl {
	paymentUrl: string;
}

export interface ICheckoutPort {
	doPayment(id: number, dataOrder: OrderToCreateDto): Promise<IPaymentUrl>;
}
