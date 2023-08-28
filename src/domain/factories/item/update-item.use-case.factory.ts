import { IItemGateway } from 'src/domain/interfaces/Item/item.gateway.interface';
import { IUpdateItemUseCase } from '../../interfaces/Item/update-item.use-case.interface';
import { UpdateItemUseCase } from '../../use-cases/item/update-item.use-case';

export const buildUpdateItemUseCase = (
	repository: IItemGateway
): IUpdateItemUseCase => {
	return new UpdateItemUseCase(repository);
};
