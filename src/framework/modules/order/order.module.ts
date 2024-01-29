/* v8 ignore start */
import { buildUpdateOrderUseCase } from '@/domain/application/factories/order/update-order.use-case.factory';
import { Module } from '@nestjs/common';
import { buildCreateOrderUseCase } from '../../../domain/application/factories/order/create-order.use-case.factory';
import {
	CREATE_ORDER_USE_CASE,
	UPDATE_ORDER_USE_CASE
} from '../../../domain/application/symbols/order.symbols';
import { MercadoPagoExternal } from '../checkout/mercado-pago.external';
import { CreateOrderQueueGateway } from './create-order-queue.gateway';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';

@Module({
	providers: [
		OrderRepository,
		MercadoPagoExternal,
		CreateOrderQueueGateway,
		{
			provide: CREATE_ORDER_USE_CASE,
			inject: [OrderRepository, MercadoPagoExternal],
			useFactory: buildCreateOrderUseCase,
		},
		{
			provide: UPDATE_ORDER_USE_CASE,
			inject: [OrderRepository, MercadoPagoExternal],
			useFactory: buildUpdateOrderUseCase,
		},
	],
	controllers: [OrderController],
})
export class OrderModule {}
/* v8 ignore stop */
