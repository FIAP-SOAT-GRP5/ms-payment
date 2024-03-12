import { CreateClientDto } from "@/domain/enterprise/dtos/create-client.dto";
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

	async updateClientToAnonymous(id: string, clientAnonymous: CreateClientDto): Promise<Client> {
		const clientIndex = this.clients.findIndex(client => `${client._id}` === `${id}`);
		if (clientIndex === -1) {
			throw new Error('Client not found');
		}

		this.clients[clientIndex].document = clientAnonymous.document;
		this.clients[clientIndex].name = clientAnonymous.name
		this.clients[clientIndex].email = clientAnonymous.email

		return this.clients[clientIndex]
	}
}
