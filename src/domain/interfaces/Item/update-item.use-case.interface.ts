import { Item } from 'src/domain/entities/item.entity';
import { UpdateItemDto } from '../../dtos/update-item.dto';

export interface IUpdateItemUseCase {
	updateItem(idItem: number, item: UpdateItemDto): Promise<Item>;
}
