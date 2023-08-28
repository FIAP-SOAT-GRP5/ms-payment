import { Item } from 'src/domain/entities/item.entity';
import { IGetItemUseCase } from '../../interfaces/Item/get-item.use-case.interface';
import { IItemGateway } from '../../interfaces/Item/item.gateway.interface';

export class GetItemUseCase implements IGetItemUseCase {
	constructor(private readonly itemGateway: IItemGateway) {}
	getItemBySnack(): Promise<Item[]> {
		return this.itemGateway.getItemBySnack();
	}

	getItemByFollowUp(): Promise<Item[]> {
		return this.itemGateway.getItemByFollowUp();
	}

	getItemByDrink(): Promise<Item[]> {
		return this.itemGateway.getItemByDrink();
	}

	getItemByDessert(): Promise<Item[]> {
		return this.itemGateway.getItemByDessert();
	}

	findById(id: number): Promise<Item> {
		return this.itemGateway.findById(id);
	}

	findAll(): Promise<Item[]> {
		return this.itemGateway.findAll();
	}
}
