import { CreateClientDto } from '@/domain/enterprise/dtos/create-client.dto';
import { Client } from '@/domain/enterprise/entities/client.entity';
import { IClientRepository } from '../../interfaces/client/client-repository.interface';
import { ICreateClientUseCase } from '../../interfaces/client/create-client.use-case.interface';

export class CreateClientUseCase implements ICreateClientUseCase {
	constructor(private readonly repository: IClientRepository) {}
	createClient(client: CreateClientDto): Promise<Client> {
		return this.repository.createClient(client);
	}
}
