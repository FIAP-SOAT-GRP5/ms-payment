import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildCreateOrderUseCase } from '../../../domain/factories/order/create-order.use-case.factory';
import { buildGetOrderUseCase } from '../../../domain/factories/order/get-order.use-case.factory';
import { buildNotifyOrderGateway } from '../../../domain/factories/order/notify-order.gateway.factory';
import { buildOrderController } from '../../../domain/factories/order/order.controller.factory';
import { buildOrderGateway } from '../../../domain/factories/order/order.gateway.factory';
import { buildPaymentOrderUseCase } from '../../../domain/factories/order/payment-order.use-case.factory';
import { buildUpdateOrderPaymentUseCase } from '../../../domain/factories/order/update-order-payment.use-case.factory';
import { buildUpdateOrderStatusUseCase } from '../../../domain/factories/order/update-order-status.use-case.factory';
import { GET_ITEM_USE_CASE } from '../../../domain/symbols/item.symbols';
import {
	CREATE_ORDER_USE_CASE,
	FAKE_NOTIFY_ORDER_GATEWAY,
	GET_ORDER_USE_CASE,
	ORDER_CONTROLLER,
	ORDER_GATEWAY,
	PAYMENT_ORDER_USE_CASE,
	UPDATE_ORDER_PAYMENT_USE_CASE,
	UPDATE_ORDER_STATUS_USE_CASE,
} from '../../../domain/symbols/order.symbols';
import { OrderEntity } from '../../entities/order.entity';
import { CheckoutModule } from '../checkout/checkout.module';
import { MercadoPagoExternal } from '../checkout/mercado-pago.external';
import { ItemModule } from '../item/item.module';
import { OrderApi } from './order.api';
import { OrderRepository } from './order.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([OrderEntity]),
		ItemModule,
		CheckoutModule,
	],
	providers: [
		OrderRepository,
		{
			provide: ORDER_CONTROLLER,
			inject: [CREATE_ORDER_USE_CASE, GET_ORDER_USE_CASE, UPDATE_ORDER_STATUS_USE_CASE, UPDATE_ORDER_PAYMENT_USE_CASE, PAYMENT_ORDER_USE_CASE],
			useFactory: buildOrderController,
		},
		{
			provide: ORDER_GATEWAY,
			inject: [OrderRepository],
			useFactory: buildOrderGateway,
		},
		{
			provide: FAKE_NOTIFY_ORDER_GATEWAY,
			useFactory: buildNotifyOrderGateway,
		},
		{
			provide: PAYMENT_ORDER_USE_CASE,
			inject: [MercadoPagoExternal],
			useFactory: buildPaymentOrderUseCase,
		},
		{
			provide: CREATE_ORDER_USE_CASE,
			inject: [ORDER_GATEWAY, GET_ITEM_USE_CASE, MercadoPagoExternal],
			useFactory: buildCreateOrderUseCase,
		},
		{
			provide: GET_ORDER_USE_CASE,
			inject: [ORDER_GATEWAY],
			useFactory: buildGetOrderUseCase,
		},
		{
			provide: UPDATE_ORDER_STATUS_USE_CASE,
			inject: [ORDER_GATEWAY, FAKE_NOTIFY_ORDER_GATEWAY],
			useFactory: buildUpdateOrderStatusUseCase,
		},
		{
			provide: UPDATE_ORDER_PAYMENT_USE_CASE,
			inject: [ORDER_GATEWAY, FAKE_NOTIFY_ORDER_GATEWAY],
			useFactory: buildUpdateOrderPaymentUseCase,
		},
	],
	controllers: [OrderApi],
})
export class OrderModule {}
