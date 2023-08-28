import { Item } from 'src/domain/entities/item.entity';
import { UpdateItemDto } from '../../dtos/update-item.dto';
import { IItemGateway } from '../../interfaces/Item/item.gateway.interface';
import { IUpdateItemUseCase } from '../../interfaces/Item/update-item.use-case.interface';

export class UpdateItemUseCase implements IUpdateItemUseCase {
	constructor(private readonly itemGateway: IItemGateway) {}
	updateItem(idItem: number, item: UpdateItemDto): Promise<Item> {
		return this.itemGateway.updateItem(idItem, item);
	}
}
