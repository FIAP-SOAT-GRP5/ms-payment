import { Client } from "@/domain/enterprise/entities/client.entity";
import { IClientRepository } from "../../src/domain/application/interfaces/client/client-repository.interface";

export class InMemoryClientRepository implements IClientRepository {
	clients: Client[] = [];

	async findByDocument(document: string): Promise<Client> {
		return this.clients.find((client) => `${client.document}` === `${document}`);
	}

	async findAll(): Promise<Client[]> {
		return this.clients;
	}

	async createClient(client: Client): Promise<Client> {
		client._id = 'some-id';
		this.clients.push(client);
		return client;
	}

}
