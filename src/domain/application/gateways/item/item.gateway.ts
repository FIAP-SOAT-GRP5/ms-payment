import { CreateItemDto } from '../../../enterprise/dtos/create-item.dto';
import { UpdateItemDto } from '../../../enterprise/dtos/update-item.dto';
import { Item } from '../../../enterprise/entities/item.entity';
import { TypeItem } from '../../../enterprise/value-objects/type-item';
import { IItemRepository } from '../../interfaces/Item/item-repository.interface';
import { IItemGateway } from '../../interfaces/Item/item.gateway.interface';

export class ItemGateway implements IItemGateway {
	constructor(
		private readonly itemRepository: IItemRepository
	) {}

	createItem(itemToCreate: CreateItemDto) {
		return this.itemRepository.save(itemToCreate);
	}

	updateItem(id: number, itemToUpdate: UpdateItemDto) {
		return this.itemRepository.save({
			id,
			...itemToUpdate,
		});
	}

	getItemBySnack(): Promise<Item[]> {
		return this.itemRepository.find({
			category: {
				id: TypeItem.SNACK,
			},
		});
	}

	getItemByFollowUp(): Promise<Item[]> {
		return this.itemRepository.find({
			category: {
				id: TypeItem.FOLLOW_UP,
			},
		});
	}

	getItemByDrink(): Promise<Item[]> {
		return this.itemRepository.find({
			category: {
				id: TypeItem.DRINK,
			},
		});
	}

	getItemByDessert(): Promise<Item[]> {
		return this.itemRepository.find({
			category: {
				id: TypeItem.DESSERT,
			},
		});
	}

	findById(id: number): Promise<Item> {
		return this.itemRepository.findById(id);
	}

	findAll(): Promise<Item[]> {
		return this.itemRepository.find();
	}
}
