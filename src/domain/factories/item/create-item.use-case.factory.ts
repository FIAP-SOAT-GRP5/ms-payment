import { ICreateItemUseCase } from 'src/domain/interfaces/Item/create-item.use-case.interface';
import { IItemGateway } from 'src/domain/interfaces/Item/item.gateway.interface';
import { CreateItemUseCase } from 'src/domain/use-cases/item/create-item.use-case';

export const buildCreateItemUseCase = (
	repository: IItemGateway
): ICreateItemUseCase => {
	return new CreateItemUseCase(repository);
};
