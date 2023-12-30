import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IItemRepository } from '../../../domain/application/interfaces/Item/item-repository.interface';
import { EntityPartial, FindOptionsWhereValue } from '../../../domain/application/utils/repository';
import { Item } from '../../../domain/enterprise/entities/item.entity';
import { ItemEntity } from '../../entities/item.entity';

@Injectable()
export class ItemRepository implements IItemRepository {
	constructor(
		@InjectRepository(ItemEntity)
		private itemRepository: Repository<ItemEntity>
	) {}

	exists(where?: FindOptionsWhereValue<Item>): Promise<boolean> {
		return this.itemRepository.exist({ where });
	}

	find(where?: FindOptionsWhereValue<Item>): Promise<Item[]> {
		return this.itemRepository.find({
			where,
		});
	}

	findOne(where?: FindOptionsWhereValue<Item>): Promise<Item> {
		return this.itemRepository.findOne({
			where,
		})
	}

	findById(id: number): Promise<Item> {
		return this.itemRepository.findOne({
			where: {
				id,
			}
		});
	}

	save(data: EntityPartial<Item>): Promise<Item> {
		return this.itemRepository.save(data);
	}
}
