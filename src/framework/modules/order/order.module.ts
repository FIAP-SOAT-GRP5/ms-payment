import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../../domain/entities/order.entity';
import { buildCreateOrderUseCase } from '../../../domain/factories/order/create-order.use-case.factory';
import { buildGetOrderUseCase } from '../../../domain/factories/order/get-order.use-case.factory';
import { buildUpdateOrderPaymentUseCase } from '../../../domain/factories/order/update-order-payment.use-case.factory';
import { buildUpdateOrderStatusUseCase } from '../../../domain/factories/order/update-order-status.use-case.factory';
import { GET_ITEM_USE_CASE } from '../../../domain/symbols/item.symbols';
import {
	CREATE_ORDER_SERVICE,
	GET_ORDER_SERVICE,
	UPDATE_ORDER_PAYMENT_USE_CASE,
	UPDATE_ORDER_STATUS_USE_CASE,
} from '../../../domain/symbols/order.symbols';
import { CheckoutModule } from '../checkout/checkout.module';
import { CheckoutGateway } from '../checkout/driven/checkout.gateway';
import { ItemModule } from '../item/item.module';
import { FakeNotifyOrderRepository } from '../notification/driven/fake-notify-order.repository';
import { NotificationModule } from '../notification/notification.module';
import { OrderRepository } from './driven/order.repository';
import { OrderApi } from './order.api';

@Module({
	imports: [
		TypeOrmModule.forFeature([Order]),
		ItemModule,
		NotificationModule,
		CheckoutModule,
	],
	providers: [
		OrderRepository,
		{
			provide: CREATE_ORDER_SERVICE,
			inject: [OrderRepository, GET_ITEM_USE_CASE, CheckoutGateway],
			useFactory: buildCreateOrderUseCase,
		},
		{
			provide: GET_ORDER_SERVICE,
			inject: [OrderRepository],
			useFactory: buildGetOrderUseCase,
		},
		{
			provide: UPDATE_ORDER_STATUS_USE_CASE,
			inject: [OrderRepository, FakeNotifyOrderRepository],
			useFactory: buildUpdateOrderStatusUseCase,
		},
		{
			provide: UPDATE_ORDER_PAYMENT_USE_CASE,
			inject: [OrderRepository, FakeNotifyOrderRepository],
			useFactory: buildUpdateOrderPaymentUseCase,
		},
	],
	controllers: [OrderApi],
})
export class OrderModule {}
