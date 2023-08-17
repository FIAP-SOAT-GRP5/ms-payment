import { Injectable } from '@nestjs/common';

import { OrderToCreateDto } from 'src/core/dtos/order-to-create.dto';

import { ICheckoutPort } from '../ports/checkout.port';

@Injectable()
export class FakeCheckoutService implements ICheckoutPort {
	constructor() {}

	doPayment(id: number, data: OrderToCreateDto): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(`Payment done for order ${id}`);
				resolve();
			}, 1500);
		});
	}
}
