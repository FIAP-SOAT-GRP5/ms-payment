import CreateClientDto from '../../dtos/create-client.dto';
import { Client } from '../../entities/client.entity';

export interface IClientGateway {
	findAllClient(): Promise<Client[]>;
	findByDocument(document: string): Promise<Client>;
	createClient({ document, email, name }: CreateClientDto): Promise<Client>;
}
