import { Client } from '../../../enterprise/entities/client.entity';
import { IGetClientUseCase } from '../../interfaces/client/get-client.use-case.interface';
import { IClientRepository } from '../../interfaces/client/client-repository.interface';

export class GetClientUseCase implements IGetClientUseCase {
	constructor(private readonly repository: IClientRepository) {}
	getClientByDocument(document: string): Promise<Client> {
		return this.repository.findByDocument(document);
	}

	findAll(): Promise<Client[]> {
		return this.repository.findAll();
	}
}
