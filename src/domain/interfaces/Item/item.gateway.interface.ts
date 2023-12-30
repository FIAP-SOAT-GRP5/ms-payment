import { CreateItemDto } from '../../dtos/create-item.dto';
import { UpdateItemDto } from '../../dtos/update-item.dto';
import { Item } from '../../entities/item.entity';

export interface IItemGateway {
	findById(id: number): Promise<Item>;
	findAll(): Promise<Item[]>;

	getItemByDrink(): Promise<Item[]>;
	getItemBySnack(): Promise<Item[]>;
	getItemByDessert(): Promise<Item[]>;
	getItemByFollowUp(): Promise<Item[]>;

	createItem(item: CreateItemDto): Promise<Item>;
	updateItem(idItem: number, item: UpdateItemDto): Promise<Item>;
}
