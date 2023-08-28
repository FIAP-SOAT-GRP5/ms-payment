import { IClientGateway } from "../../interfaces/client/client.gateway.interface";
import { ICreateClientUseCase } from "../../interfaces/client/create-client.use-case.interface";
import { CreateClientUseCase } from "../../use-cases/client/create-client.use-case";

export const buildCreateClientUseCase = (repository: IClientGateway): ICreateClientUseCase => {
	return new CreateClientUseCase(repository);
}