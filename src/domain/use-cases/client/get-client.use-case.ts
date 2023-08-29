import { Client } from '../../entities/client.entity';
import { IClientGateway } from '../../interfaces/client/client.gateway.interface';
import { IGetClientUseCase } from '../../interfaces/client/get-client.use-case.interface';

export class GetClientUseCase implements IGetClientUseCase {
	constructor(private readonly clientGateway: IClientGateway) {}
	findAllClient(): Promise<Client[]> {
		return this.clientGateway.findAllClient();
	}
	findByDocument(document: string): Promise<Client> {
		return this.clientGateway.findByDocument(document);
	}
}
