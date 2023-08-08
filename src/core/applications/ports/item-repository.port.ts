import { Item } from 'src/core/domain/item.entity';
import { ItemToCreateDto } from '../../dtos/item-to-create.dto';
import { ItemToUpdateDto } from '../../dtos/item-to-update.dto';

export interface IItemRepositoryPort {
	findById(id: number): Promise<Item>;
	getItemBySnack(): Promise<Item[]>;
	getItemByFollowUp(): Promise<Item[]>;
	getItemByDrink(): Promise<Item[]>;
	getItemByDessert(): Promise<Item[]>;

	createItem(item: ItemToCreateDto);
	updateItem(idItem: number, item: ItemToUpdateDto);
}
