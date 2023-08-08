import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from 'src/core/domain/item.entity';
import { ItemController } from './driver/item.controller';
import { ItemRepository } from './driven/item.repository';
import { buildGetItemService } from './factories/get-item.service.factory';
import { GET_ITEM_SERVICE, PERSISTENCE_ITEM_SERVICE } from './item.symbols';

@Module({
	imports: [TypeOrmModule.forFeature([Item])],
	providers: [
		ItemRepository,
		{
			provide: GET_ITEM_SERVICE,
			inject: [ItemRepository],
			useFactory: buildGetItemService,
		},
		{
			provide: PERSISTENCE_ITEM_SERVICE,
			inject: [ItemRepository],
			useFactory: buildGetItemService,
		},
	],
	controllers: [ItemController],
	exports: [GET_ITEM_SERVICE],
})
export class ItemModule {}
