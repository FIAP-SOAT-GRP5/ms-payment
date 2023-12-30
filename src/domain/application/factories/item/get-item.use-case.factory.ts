import { IGetItemUseCase } from '@/domain/application/interfaces/Item/get-item.use-case.interface';
import { IItemGateway } from '@/domain/application/interfaces/Item/item.gateway.interface';
import { GetItemUseCase } from '../../use-cases/item/get-item.use-case';

export const buildGetItemUseCase = (
	repository: IItemGateway
): IGetItemUseCase => {
	return new GetItemUseCase(repository);
};
