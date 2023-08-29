import CreateClientDto from '../../dtos/create-client.dto';
import { Client } from '../../entities/client.entity';
import { IClientRepository } from '../../interfaces/client/client-repository.interface';
import { IClientGateway } from '../../interfaces/client/client.gateway.interface';

export class ClientGateway implements IClientGateway {
	constructor(
		private readonly clientRepository: IClientRepository
	) {}

	async findAllClient(): Promise<Client[]> {
		return this.clientRepository.find();
	}

	async findByDocument(document: string): Promise<Client> {
		return this.clientRepository.findOne({
			document,
		});
	}

	async createClient(clientData: CreateClientDto): Promise<Client> {
		return this.clientRepository.save(clientData);
	}
}
