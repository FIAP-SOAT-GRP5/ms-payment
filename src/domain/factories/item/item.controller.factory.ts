import { IGetItemUseCase } from 'src/domain/interfaces/Item/get-item.use-case.interface';
import { ItemController } from '../../controllers/item.controller';
import { ICreateItemUseCase } from '../../interfaces/Item/create-item.use-case.interface';
import { IUpdateItemUseCase } from '../../interfaces/Item/update-item.use-case.interface';

export const buildItemController = (
	getItemUseCase: IGetItemUseCase,
	createItemUseCase: ICreateItemUseCase,
	updateItemUseCase: IUpdateItemUseCase,
): ItemController => {
	return new ItemController(getItemUseCase, createItemUseCase, updateItemUseCase);
};
