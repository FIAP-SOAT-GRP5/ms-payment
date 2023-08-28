import { Item } from 'src/domain/entities/item.entity';
import { CreateItemDto } from '../../dtos/create-item.dto';

export interface ICreateItemUseCase {
	createItem(item: CreateItemDto): Promise<Item>;
}
