import { ICreateItemUseCase } from '@/domain/application/interfaces/Item/create-item.use-case.interface';
import { IItemGateway } from '@/domain/application/interfaces/Item/item.gateway.interface';
import { CreateItemUseCase } from '../../use-cases/item/create-item.use-case';

export const buildCreateItemUseCase = (
	repository: IItemGateway
): ICreateItemUseCase => {
	return new CreateItemUseCase(repository);
};
