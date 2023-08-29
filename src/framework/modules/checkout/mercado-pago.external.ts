import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { OrderToCreateDto } from '../../../domain/dtos/order-to-create.dto';
import { MercadoPagoServiceError } from '../../../domain/errors/mercadopago-service-error';
import { ICheckoutGateway, IPaymentData, IPaymentUrl } from '../../../domain/interfaces/checkout/checkout.gateway.interface';

@Injectable()
export class MercadoPagoExternal implements ICheckoutGateway {
	async getPayment(id: number): Promise<IPaymentData> {
		const paymentData = await mercadopago.payment.get(id);
		const { metadata, status } = paymentData.body
		const { order_id } = metadata;
		return {
			order_id: +order_id,
			status
		}
	}

	async doPayment(id: number, data: OrderToCreateDto): Promise<IPaymentUrl> {
		const checkoutItems = data.orderItems.map(orderItem => {
			return {
				title: orderItem.item.name,
				unit_price: orderItem.price,
				quantity: orderItem.quantity,
			}
		})
		const preference = {
			items: checkoutItems,
			metadata: {
				order_id: id
			}
		};
		const paymentUrl = await mercadopago.preferences.create(preference)
			.then((response) => {
				return {
					paymentUrl: response.body.init_point
				}
			}).catch(() => {
				throw new MercadoPagoServiceError()
			});
		return paymentUrl
	}

}
