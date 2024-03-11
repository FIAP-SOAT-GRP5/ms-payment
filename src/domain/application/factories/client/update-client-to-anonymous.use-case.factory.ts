import { IClientRepository } from "../../interfaces/client/client-repository.interface";

import { IUpdateClientToAnonymousUseCase } from "../../interfaces/client/update-client-to-anonymous.use-case.interface";
import { UpdateClientToAnonymous } from "../../use-cases/client/update-client-to-anonymous.use-case";

export const buildUpdateClientToAnonymousUseCase = (
	repository: IClientRepository
): IUpdateClientToAnonymousUseCase => {
	return new UpdateClientToAnonymous(repository);
}