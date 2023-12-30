import { CreateItemDto } from '../dtos/create-item.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { Item } from '../entities/item.entity';
import { ICreateItemUseCase } from '../interfaces/Item/create-item.use-case.interface';
import { IGetItemUseCase } from '../interfaces/Item/get-item.use-case.interface';
import { IUpdateItemUseCase } from '../interfaces/Item/update-item.use-case.interface';

export class ItemController {
	constructor(
		private readonly getItemUseCase: IGetItemUseCase,
		private readonly createItemUseCase: ICreateItemUseCase,
		private readonly updateItemUseCase: IUpdateItemUseCase,
	) {}

	public async getItemBySnack(): Promise<Item[]> {
		return this.getItemUseCase.getItemBySnack();
	}

	public async getItemByFollowUp(): Promise<Item[]> {
		return this.getItemUseCase.getItemByFollowUp();
	}

	public async getItemByDrink(): Promise<Item[]> {
		return this.getItemUseCase.getItemByDrink();
	}

	public async getItemByDessert(): Promise<Item[]> {
		return this.getItemUseCase.getItemByDessert();
	}

	public async findById(id: number): Promise<Item> {
		return this.getItemUseCase.findById(id);
	}

	public async createItem(item: CreateItemDto): Promise<Item> {
		return this.createItemUseCase.createItem(item);
	}

	public async updateItem(id: number, item: UpdateItemDto): Promise<Item> {
		return this.updateItemUseCase.updateItem(id, item);
	}

	public async findAll(): Promise<Item[]> {
		return this.getItemUseCase.findAll();
	}
}
