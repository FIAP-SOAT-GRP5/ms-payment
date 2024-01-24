/* v8 ignore start */
import { Client } from "@/domain/enterprise/entities/client.entity";

export interface IGetClientUseCase {
	findAll(): Promise<Client[]>;
	getClientByDocument(document: string): Promise<Client>;
}
/* v8 ignore stop */