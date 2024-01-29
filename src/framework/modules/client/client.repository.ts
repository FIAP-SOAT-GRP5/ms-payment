/* v8 ignore start */
import { CreateClientDto } from '@/domain/enterprise/dtos/create-client.dto';
import { Client } from '@/domain/enterprise/entities/client.entity';
import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../../../domain/application/interfaces/client/client-repository.interface';
import { CreatedClientSchema, toDomain } from '../../entities/client.schema';

@Injectable()
export class ClientRepository implements IClientRepository {

	async findAll(): Promise<Client[]> {
		return CreatedClientSchema.scan().exec().then((clients) => clients.map(toDomain));
	}

	async findByDocument(document: string): Promise<Client> {
		return CreatedClientSchema.scan('document').eq(`${document}`).exec().then((clients) => {
			return clients.map(toDomain)[0];
		});
	}

	async createClient(clientToCreate: CreateClientDto): Promise<Client> {
		return CreatedClientSchema.create(clientToCreate).then(toDomain);
	}
}
/* v8 ignore stop */