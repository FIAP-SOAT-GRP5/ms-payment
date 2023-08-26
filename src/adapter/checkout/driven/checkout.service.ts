import { Injectable } from '@nestjs/common';
import { ICheckoutPort, IPaymentUrl } from '../../../core/applications/ports/checkout.port';

import { OrderToCreateDto } from 'src/core/dtos/order-to-create.dto';

import * as mercadopago from 'mercadopago';

import { MercadoPagoServiceError } from 'src/core/errors/mercadopago-service-error';

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
			items: checkoutItems,
			metadata: {
				order_id: id
			}
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




