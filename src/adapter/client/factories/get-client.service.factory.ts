import { IGetClientService } from "../../../core/applications/interfaces/get-client.service.interface";
import { IClientRepositoryPort } from "../../../core/applications/ports/client-repository.port";
import { ClientService } from "../../../core/applications/services/client.service";

export const buildGetClientService = (repository: IClientRepositoryPort): IGetClientService => {
	return new ClientService(repository);
}