import { Injectable } from '@nestjs/common';

import { ICheckoutPort, IPaymentUrl } from 'src/core/applications/ports/checkout.port';
import { OrderToCreateDto } from 'src/core/dtos/order-to-create.dto';

@Injectable()
export class CheckoutRepository implements ICheckoutPort {
	constructor() {}

	doPayment(id: number, dataOrder: OrderToCreateDto): Promise<IPaymentUrl> {
		throw new Error('Method not implemented.');
	}
}
