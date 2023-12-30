import { ItemGateway } from '../../gateways/item/item.gateway';
import { IItemRepository } from '../../interfaces/Item/item-repository.interface';
import { IItemGateway } from '../../interfaces/Item/item.gateway.interface';

export const buildItemGateway = (
	itemRepository: IItemRepository,
): IItemGateway => {
	return new ItemGateway(itemRepository);
};
