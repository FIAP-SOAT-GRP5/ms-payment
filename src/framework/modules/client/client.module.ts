import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildClientController } from '../../../domain/factories/client/client.controller.factory';
import { buildClientGateway } from '../../../domain/factories/client/client.gateway.factory';
import { buildCreateClientUseCase } from '../../../domain/factories/client/create-client.use-case.factory';
import { buildGetClientUseCase } from '../../../domain/factories/client/get-client.use-case.factory';
import { CLIENT_CONTROLLER, CLIENT_GATEWAY, CREATE_CLIENT_USE_CASE, GET_CLIENT_USE_CASE } from '../../../domain/symbols/client.symbols';
import { ClientEntity } from '../../entities/client.entity';
import { ClientApi } from './client.api';
import { ClientRepository } from './client.repository';

@Module({
	imports: [TypeOrmModule.forFeature([ClientEntity])],
	providers: [
		ClientRepository,
		{
			provide: CLIENT_CONTROLLER,
			inject: [GET_CLIENT_USE_CASE, CREATE_CLIENT_USE_CASE],
			useFactory: buildClientController,
		},
		{
			provide: CLIENT_GATEWAY,
			inject: [ClientRepository],
			useFactory: buildClientGateway,
		},
		{
			provide: GET_CLIENT_USE_CASE,
			inject: [CLIENT_GATEWAY],
			useFactory: buildGetClientUseCase,
		},
		{
			provide: CREATE_CLIENT_USE_CASE,
			inject: [CLIENT_GATEWAY],
			useFactory: buildCreateClientUseCase,
		},
	],
	controllers: [ClientApi],
})
export class ClientModule {}
