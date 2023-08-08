import { ICreateClientService } from "../../../core/applications/interfaces/create-client.service.interface";
import { IClientRepositoryPort } from "../../../core/applications/ports/client-repository.port";
import { ClientService } from "../../../core/applications/services/client.service";

export const buildCreateClientService = (repository: IClientRepositoryPort): ICreateClientService => {
	return new ClientService(repository);
}