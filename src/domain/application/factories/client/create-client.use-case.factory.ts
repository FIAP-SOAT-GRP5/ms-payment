import { ICreateClientUseCase } from "../../interfaces/client/create-client.use-case.interface";
import { IClientRepository } from "../../interfaces/client/client-repository.interface";

import { CreateClientUseCase } from "../../use-cases/client/create-client.use-case";

export const buildCreateClientUseCase = (
	repository: IClientRepository
): ICreateClientUseCase => {
	return new CreateClientUseCase(repository);
}