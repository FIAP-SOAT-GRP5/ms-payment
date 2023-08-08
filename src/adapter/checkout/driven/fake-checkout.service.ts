import { Injectable } from '@nestjs/common';
import { ICheckoutPort } from '../../../core/applications/ports/checkout.port';

@Injectable()
export class FakeCheckoutService implements ICheckoutPort {
	constructor() {}

	doPayment(id: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(`Payment done for order ${id}`);
				resolve();
			}, 1500);
		});
	}
}
