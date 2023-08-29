import { Client } from '../../entities/client.entity';

export interface IGetClientUseCase {
	findByDocument(document: string): Promise<Client>;
	findAllClient(): Promise<Client[]>;
}
