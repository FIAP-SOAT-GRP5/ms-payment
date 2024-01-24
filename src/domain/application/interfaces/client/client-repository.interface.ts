/* v8 ignore start */
import { CreateClientDto } from "@/domain/enterprise/dtos/create-client.dto";
import { Client } from "@/domain/enterprise/entities/client.entity";

export interface IClientRepository {
	findAll(): Promise<Client[]>;
	findByDocument(document: string): Promise<Client>;
	createClient(client: CreateClientDto): Promise<Client>;
}
/* v8 ignore stop */