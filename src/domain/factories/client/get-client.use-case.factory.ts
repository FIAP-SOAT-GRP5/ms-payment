import { IClientGateway } from '../../interfaces/client/client.gateway.interface';
import { IGetClientUseCase } from '../../interfaces/client/get-client.use-case.interface';
import { GetClientUseCase } from '../../use-cases/client/get-client.use-case';

export const buildGetClientUseCase = (
	repository: IClientGateway
): IGetClientUseCase => {
	return new GetClientUseCase(repository);
};
