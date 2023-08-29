import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../../domain/entities/client.entity';
import { IClientRepository } from '../../../domain/interfaces/client/client-repository.interface';
import { EntityPartial, FindOptionsWhereValue } from '../../../domain/utils/repository';
import { ClientEntity } from '../../entities/client.entity';

@Injectable()
export class ClientRepository implements IClientRepository {
	constructor(
		@InjectRepository(ClientEntity)
		private clientRepository: Repository<ClientEntity>
	) {}

	exists(where?: FindOptionsWhereValue<Client>): Promise<boolean> {
		return this.clientRepository.exist({ where });
	}

	find(where?: FindOptionsWhereValue<Client>): Promise<Client[]> {
		return this.clientRepository.find({
			where,
		});
	}

	findOne(where?: FindOptionsWhereValue<Client>): Promise<Client> {
		return this.clientRepository.findOne({
			where,
		})
	}

	findById(id: number): Promise<Client> {
		return this.clientRepository.findOne({
			where: {
				id,
			}
		});
	}

	save(data: EntityPartial<Client>): Promise<Client> {
		return this.clientRepository.save(data);
	}
}
