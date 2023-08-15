import CreateClientDto from 'src/adapter/client/dtos/create-client.dto';
import { Client } from '../../domain/client.entity';

export interface IClientRepositoryPort {
	findAllClient(): Promise<Client[]>;
	findByDocument(document: string): Promise<Client>;
	createClient({ document, email, name }: CreateClientDto): Promise<Client>;
}
