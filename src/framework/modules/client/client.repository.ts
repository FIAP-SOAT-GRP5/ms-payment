/* v8 ignore start */
import { CreateClientDto } from '@/domain/enterprise/dtos/create-client.dto';
import { Client } from '@/domain/enterprise/entities/client.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IClientRepository } from '../../../domain/application/interfaces/client/client-repository.interface';
import { ClientSchema } from '../../entities/client.schema';

@Injectable()
export class ClientRepository implements IClientRepository {
	constructor(
		@InjectModel(ClientSchema.name)
		private clientRepository: Model<ClientSchema>
	) {}

	async findAll(): Promise<Client[]> {
		const result = await this.clientRepository.find().exec();
		return result.map(ClientSchema.toDomain);
	}

	async findByDocument(document: string): Promise<Client> {
		const result = await this.clientRepository.findOne({ document }).exec();
		return ClientSchema.toDomain(result);
	}

	async createClient(clientToCreate: CreateClientDto): Promise<Client> {
		const createdClient = new this.clientRepository(clientToCreate)
		const result = await createdClient.save();
		return ClientSchema.toDomain(result);
	}
}
/* v8 ignore stop */