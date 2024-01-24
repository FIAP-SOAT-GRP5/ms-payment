import { IClientRepository } from '../../interfaces/client/client-repository.interface';
import { IGetClientUseCase } from '../../interfaces/client/get-client.use-case.interface';
import { GetClientUseCase } from '../../use-cases/client/get-client.use-case';

export const buildGetClientUseCase = (
	repository: IClientRepository
): IGetClientUseCase => {
	return new GetClientUseCase(repository);
};
