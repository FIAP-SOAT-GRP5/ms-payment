import { Injectable } from '@nestjs/common';

import { OrderToCreateDto } from 'src/core/dtos/order-to-create.dto';
import PaymentStatusDto from '../../../adapter/checkout/dtos/payment-status.dto';

import { ICheckoutPort } from '../ports/checkout.port';

@Injectable()
export class FakeCheckoutService implements ICheckoutPort {
	constructor() {}

	updateOrderStatusAndPaymentStatus(
		ipaymentStatusDto: PaymentStatusDto
	): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	doPayment(id: number, data: OrderToCreateDto): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(`Payment done for order ${id}`);
				resolve();
			}, 1500);
		});
	}
}
