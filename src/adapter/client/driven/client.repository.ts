import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Client } from '../../../core/domain/client.entity';
import { IClientRepositoryPort } from '../../../core/applications/ports/client-repository.port';
import CreateClientDto from '../dtos/create-client.dto';

@Injectable()
export class ClientRepository implements IClientRepositoryPort {
	constructor(@InjectRepository(Client) private clientRepository: Repository<Client>) {
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
		await this.clientRepository.save(client)
		return client;
	}
}
