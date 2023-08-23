import { Injectable } from '@nestjs/common';
import { ICheckoutPort, IPaymentUrl } from '../../../core/applications/ports/checkout.port';

import { OrderToCreateDto } from 'src/core/dtos/order-to-create.dto';

const mercadopago = require('mercadopago')

import env from '../../../config/env';
import { MercadoPagoServiceError } from 'src/core/errors/mercadopago-service-error';

mercadopago.configure({
    access_token: env.MP_ACCESS_TOKEN
});

@Injectable()
export class CheckoutService implements ICheckoutPort {
	constructor() {}

	doPayment(id: number, data: OrderToCreateDto): Promise<IPaymentUrl> {
		const checkoutItems = data.orderItems.map(orderItem => {
			return {
				title: orderItem.item.name,
				unit_price: orderItem.price,
				quantity: orderItem.quantity,
			}
		})

		let preference = {
			items: checkoutItems
		};

		const paymentUrl = mercadopago.preferences.create(preference)
			.then((response: any) => {
				return {
					paymentUrl: response.body.init_point
				}
			}).catch((error: any) => {
				throw new MercadoPagoServiceError()
			});

		return paymentUrl
	}
}




