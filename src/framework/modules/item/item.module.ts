import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/domain/entities/item.entity';
import { buildCreateItemUseCase } from '../../../domain/factories/item/create-item.use-case.factory';
import { buildGetItemUseCase } from '../../../domain/factories/item/get-item.use-case.factory';
import { buildUpdateItemUseCase } from '../../../domain/factories/item/update-item.use-case.factory';
import { CREATE_ITEM_USE_CASE, GET_ITEM_USE_CASE, UPDATE_ITEM_USE_CASE } from '../../../domain/symbols/item.symbols';
import { ItemRepository } from './driven/item.repository';
import { ItemController } from './driver/item.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Item])],
	providers: [
		ItemRepository,
		{
			provide: GET_ITEM_USE_CASE,
			inject: [ItemRepository],
			useFactory: buildGetItemUseCase,
		},
		{
			provide: CREATE_ITEM_USE_CASE,
			inject: [ItemRepository],
			useFactory: buildCreateItemUseCase,
		},
		{
			provide: UPDATE_ITEM_USE_CASE,
			inject: [ItemRepository],
			useFactory: buildUpdateItemUseCase,
		},
	],
	controllers: [ItemController],
	exports: [GET_ITEM_USE_CASE],
})
export class ItemModule {}
