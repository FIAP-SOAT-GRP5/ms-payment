import { Item } from 'src/domain/entities/item.entity';

import { ItemToCreateDto } from '../../dtos/item-to-create.dto';
import { ItemToUpdateDto } from '../../dtos/item-to-update.dto';

export interface IItemGateway {
	findById(id: number): Promise<Item>;
	findAll(): Promise<Item[]>;

	getItemByDrink(): Promise<Item[]>;
	getItemBySnack(): Promise<Item[]>;
	getItemByDessert(): Promise<Item[]>;
	getItemByFollowUp(): Promise<Item[]>;

	createItem(item: ItemToCreateDto);
	updateItem(idItem: number, item: ItemToUpdateDto);
}
