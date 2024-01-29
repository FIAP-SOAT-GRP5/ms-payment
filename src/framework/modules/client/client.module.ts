/* v8 ignore start */
import { buildCreateClientUseCase } from '@/domain/application/factories/client/create-client.use-case.factory';
import { Module } from '@nestjs/common';
import { buildGetClientUseCase } from '../../../domain/application/factories/client/get-client.use-case.factory';
import { CREATE_CLIENT_USE_CASE, GET_CLIENT_USE_CASE } from '../../../domain/application/symbols/client.symbols';
import { ClientController } from './client.controller';
import { ClientRepository } from './client.repository';

@Module({
	providers: [
		ClientRepository,
		{
			provide: GET_CLIENT_USE_CASE,
			inject: [ClientRepository],
			useFactory: buildGetClientUseCase,
		},
		{
			provide: CREATE_CLIENT_USE_CASE,
			inject: [ClientRepository],
			useFactory: buildCreateClientUseCase,
		},
	],
	controllers: [ClientController],
})
export class ClientModule {}
/* v8 ignore stop */