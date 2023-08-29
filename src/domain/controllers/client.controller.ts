import CreateClientDto from '../dtos/create-client.dto';
import { Client } from '../entities/client.entity';
import { ICreateClientUseCase } from '../interfaces/client/create-client.use-case.interface';
import { IGetClientUseCase } from '../interfaces/client/get-client.use-case.interface';

export class ClientController {
	constructor(
		private readonly getClientService: IGetClientUseCase,
		private readonly createClientService: ICreateClientUseCase
	) {}

	public async findAllClient(): Promise<Client[]> {
		return this.getClientService.findAllClient();
	}

	public async findByDocument(document: string): Promise<Client> {
		return this.getClientService.findByDocument(document);
	}

	public async createClient(createClientDTO: CreateClientDto): Promise<Client> {
		return this.createClientService.createClient(createClientDTO);
	}
}
