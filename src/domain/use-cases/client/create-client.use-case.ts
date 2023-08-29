import CreateClientDto from '../../dtos/create-client.dto';
import { Client } from '../../entities/client.entity';
import { IClientGateway } from '../../interfaces/client/client.gateway.interface';
import { ICreateClientUseCase } from '../../interfaces/client/create-client.use-case.interface';

export class CreateClientUseCase implements ICreateClientUseCase {
	constructor(private readonly clientGateway: IClientGateway) {}
	createClient({ document, email, name }: CreateClientDto): Promise<Client> {
		return this.clientGateway.createClient({ document, email, name });
	}
}
