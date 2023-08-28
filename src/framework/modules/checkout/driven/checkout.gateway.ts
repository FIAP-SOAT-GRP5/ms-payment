import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { OrderToCreateDto } from 'src/domain/dtos/order-to-create.dto';
import { MercadoPagoServiceError } from 'src/domain/errors/mercadopago-service-error';
import { ICheckoutGateway, IPaymentUrl } from '../../../../domain/interfaces/checkout/checkout.gateway.interface';

@Injectable()
export class CheckoutGateway implements ICheckoutGateway {

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




