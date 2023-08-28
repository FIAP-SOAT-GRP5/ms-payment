import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../../../domain/entities/client.entity';
import { IClientGateway } from '../../../../domain/interfaces/client/client.gateway.interface';
import CreateClientDto from '../dtos/create-client.dto';

@Injectable()
export class ClientGateway implements IClientGateway {
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
