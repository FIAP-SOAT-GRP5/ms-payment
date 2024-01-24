/* v8 ignore start */
import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../../../domain/application/interfaces/client/client-repository.interface';

import { CreateClientDto } from '@/domain/enterprise/dtos/create-client.dto';
import { Client } from '@/domain/enterprise/entities/client.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientEntity } from '../../entities/client.entity';

@Injectable()
export class ClientRepository implements IClientRepository {
	constructor(
		@InjectModel(ClientEntity.name)
		private clientRepository: Model<ClientEntity>
	) {}

	findAll(): Promise<Client[]> {
		return this.clientRepository.find().exec();
	}

	findByDocument(document: string): Promise<Client> {
		return this.clientRepository.findOne( { document } ).exec();
	}

	createClient(clientToCreate: CreateClientDto): Promise<Client> {
		const createdClient = new this.clientRepository(clientToCreate)
		return createdClient.save();
	}
}
/* v8 ignore stop */