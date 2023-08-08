import { Item } from 'src/core/domain/item.entity';
import { CreateItemDto } from '../../../dtos/create-item.dto';
import { UpdateItemDto } from '../../../dtos/update-item.dto';

export interface IPersistenceItemService {
	createItem(item: CreateItemDto): Promise<Item>;
	updateItem(idItem: number, item: UpdateItemDto): Promise<Item>;
}
