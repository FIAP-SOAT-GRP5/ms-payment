import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Item } from 'src/core/domain/item.entity';
import { TypeItem } from 'src/core/value-objects/type-item';
import { IItemRepositoryPort } from 'src/core/applications/ports/item-repository.port';

import { ItemToCreateDto } from '../../../core/dtos/item-to-create.dto';
import { ItemToUpdateDto } from '../../../core/dtos/item-to-update.dto';

@Injectable()
export class ItemRepository implements IItemRepositoryPort {
	constructor(
		@InjectRepository(Item)
		private itemRepository: Repository<Item>
	) {}

	createItem(itemToCreate: ItemToCreateDto) {
		return this.itemRepository.save(itemToCreate);
	}

	updateItem(id: number, itemToUpdate: ItemToUpdateDto) {
		return this.itemRepository.save({
			id,
			...itemToUpdate,
		});
	}

	getItemBySnack(): Promise<Item[]> {
		return this.itemRepository.find({
			where: {
				category: {
					id: TypeItem.SNACK,
				},
			},
		});
	}

	getItemByFollowUp(): Promise<Item[]> {
		return this.itemRepository.find({
			where: {
				category: {
					id: TypeItem.FOLLOW_UP,
				},
			},
		});
	}

	getItemByDrink(): Promise<Item[]> {
		return this.itemRepository.find({
			where: {
				category: {
					id: TypeItem.DRINK,
				},
			},
		});
	}

	getItemByDessert(): Promise<Item[]> {
		return this.itemRepository.find({
			where: {
				category: {
					id: TypeItem.DESSERT,
				},
			},
		});
	}

	findById(id: number): Promise<Item> {
		return this.itemRepository.findOne({
			where: {
				id,
			},
		});
	}

	findAll(): Promise<Item[]> {
		return this.itemRepository.find();
	}
}
