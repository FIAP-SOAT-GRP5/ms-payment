import { Client } from '@/domain/enterprise/entities/client.entity';
import { IClientRepository } from '../../interfaces/client/client-repository.interface';
import { IUpdateClientToAnonymousUseCase } from '../../interfaces/client/update-client-to-anonymous.use-case.interface';

export class UpdateClientToAnonymousUseCase implements IUpdateClientToAnonymousUseCase {
	constructor(private readonly repository: IClientRepository) {}
	updateClient(id: string): Promise<Client> {
		const clientToUpdate = {
			name: '',
			document: '12345678909',
			email: ''
		}
		return this.repository.updateClientToAnonymous(id, clientToUpdate);
	}
}
