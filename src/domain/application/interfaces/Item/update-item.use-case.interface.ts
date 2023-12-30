import { UpdateItemDto } from '../../../enterprise/dtos/update-item.dto';
import { Item } from '../../../enterprise/entities/item.entity';

export interface IUpdateItemUseCase {
	updateItem(idItem: number, item: UpdateItemDto): Promise<Item>;
}
