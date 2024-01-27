import { Client } from "@/domain/enterprise/entities/client.entity";
import { IClientRepository } from "../../src/domain/application/interfaces/client/client-repository.interface";

export class InMemoryClientRepository implements IClientRepository {
	clients: Client[] = [];

	private generateId(): number {
		const findBiggestId = () => {
			let biggestId = 0;
			for (const client of this.clients) {
				if (client.getId() > biggestId) {
					biggestId = client._id;
				}
			}
			return biggestId;
		}
		return findBiggestId() + 1;
	}

	async findByDocument(document: string): Promise<Client> {
		return this.clients.find((client) => client.document === document);
	}

	async findAll(): Promise<Client[]> {
		return this.clients;
	}

	async createClient(client: Client): Promise<Client> {
		client._id = this.generateId();
		this.clients.push(client);
		return client;
	}

}
