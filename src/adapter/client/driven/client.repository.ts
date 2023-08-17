import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import CreateClientDto from '../dtos/create-client.dto';
import { Client } from '../../../core/domain/client.entity';
import { IClientRepositoryPort } from '../../../core/applications/ports/client-repository.port';

@Injectable()
export class ClientRepository implements IClientRepositoryPort {
	constructor(
		@InjectRepository(Client)
		private clientRepository: Repository<Client>
	) {}
	findAllClient(): Promise<Client[]> {
		return this.clientRepository.find();
	}
	findByDocument(document: string): Promise<Client> {
		return this.clientRepository.findOne({
			where: {
				document,
			},
		});
	}
	async createClient(clientData: CreateClientDto): Promise<Client> {
		const client = this.clientRepository.create(clientData);
		await this.clientRepository.save(client);
		return client;
	}
}
