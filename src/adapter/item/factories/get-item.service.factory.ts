import { IGetItemService } from 'src/core/applications/interfaces/Item/get-item.service.interface';
import { IItemRepositoryPort } from 'src/core/applications/ports/item-repository.port';
import { ItemService } from 'src/core/applications/services/item.service';

export const buildGetItemService = (
	repository: IItemRepositoryPort
): IGetItemService => {
	return new ItemService(repository);
};
