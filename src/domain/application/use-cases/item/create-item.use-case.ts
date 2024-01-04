import { CreateItemDto } from '../../../enterprise/dtos/create-item.dto';
import { Item } from '../../../enterprise/entities/item.entity';
import { ICreateItemUseCase } from '../../interfaces/Item/create-item.use-case.interface';
import { IItemGateway } from '../../interfaces/Item/item.gateway.interface';

export class CreateItemUseCase implements ICreateItemUseCase {
	constructor(private readonly itemGateway: IItemGateway) {}
	createItem(item: CreateItemDto): Promise<Item> {
		return this.itemGateway.createItem(item);
	}
}
