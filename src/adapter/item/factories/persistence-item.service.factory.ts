import { IPersistenceItemService } from 'src/core/applications/interfaces/Item/persistence-item.service.interface';
import { IItemRepositoryPort } from 'src/core/applications/ports/item-repository.port';
import { ItemService } from 'src/core/applications/services/item.service';

export const buildPersistenceItemService = (
	repository: IItemRepositoryPort
): IPersistenceItemService => {
	return new ItemService(repository);
};
