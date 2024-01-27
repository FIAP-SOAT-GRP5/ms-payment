/* v8 ignore start */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { buildCreateOrderUseCase } from '../../../domain/application/factories/order/create-order.use-case.factory';
import { buildGetOrderUseCase } from '../../../domain/application/factories/order/get-order.use-case.factory';
import {
	CREATE_ORDER_USE_CASE,
	GET_ORDER_USE_CASE,
	UPDATE_ORDER_USE_CASE,
} from '../../../domain/application/symbols/order.symbols';
import { OrderSchema, CreatedOrderSchema } from '../../entities/order.schema';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { QueueGateway } from './queue.gateway';

@Module({
	imports: [
		MongooseModule.forFeature([{name: OrderSchema.name, schema: CreatedOrderSchema}]),
	],
	providers: [
		OrderRepository,
		QueueGateway,
		{
			provide: CREATE_ORDER_USE_CASE,
			inject: [OrderRepository, QueueGateway],
			useFactory: buildCreateOrderUseCase,
		},
		{
			provide: GET_ORDER_USE_CASE,
			inject: [OrderRepository],
			useFactory: buildGetOrderUseCase,
		},
		{
			provide: UPDATE_ORDER_USE_CASE,
			inject: [OrderRepository],
			useFactory: buildGetOrderUseCase,
		},
	],
	controllers: [OrderController],
})
export class OrderModule {}
/* v8 ignore stop */
