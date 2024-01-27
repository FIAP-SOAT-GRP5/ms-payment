import { MercadoPagoServiceError } from '@/core/errors/order-without-items.error';
import { ICheckoutGateway, IPaymentData, IPaymentUrl } from '@/domain/application/interfaces/checkout/checkout.gateway.interface';
import { CreateOrderDto } from '@/domain/enterprise/dtos/create-order.dto';
import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';

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

	async doPayment(id: number, data: CreateOrderDto): Promise<IPaymentUrl> {
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
				console.log('response', response)
				return {
					paymentUrl: response.body.init_point
				}
			}).catch((error) => {
				console.log(error)
				throw new MercadoPagoServiceError(error)
			});
		return paymentUrl
	}

}
