/* v8 ignore start */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildCreateOrderUseCase } from '../../../domain/application/factories/order/create-order.use-case.factory';
import { buildGetOrderUseCase } from '../../../domain/application/factories/order/get-order.use-case.factory';
import { GET_ITEM_USE_CASE } from '../../../domain/application/symbols/item.symbols';
import {
	CREATE_ORDER_USE_CASE,
	GET_ORDER_USE_CASE,
} from '../../../domain/application/symbols/order.symbols';
import { OrderEntity } from '../../entities/order.entity';
import { ItemModule } from '../item/item.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { QueueGateway } from './queue.gateway';

@Module({
	imports: [
		TypeOrmModule.forFeature([OrderEntity]),
		ItemModule,
	],
	providers: [
		OrderRepository,
		QueueGateway,
		{
			provide: CREATE_ORDER_USE_CASE,
			inject: [OrderRepository, GET_ITEM_USE_CASE, QueueGateway],
			useFactory: buildCreateOrderUseCase,
		},
		{
			provide: GET_ORDER_USE_CASE,
			inject: [OrderRepository],
			useFactory: buildGetOrderUseCase,
		},
	],
	controllers: [OrderController],
})
export class OrderModule {}
/* v8 ignore stop */
