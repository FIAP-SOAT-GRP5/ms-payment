import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../../../domain/entities/client.entity';
import { buildGetClientUseCase } from '../../../domain/factories/client/get-client.use-case.factory';
import { CREATE_CLIENT_USE_CASE, GET_CLIENT_USE_CASE } from '../../../domain/symbols/client.symbols';
import { ClientGateway } from './driven/client.repository';
import { ClientController } from './driver/client.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Client])],
	providers: [
		ClientGateway,
		{
			provide: GET_CLIENT_USE_CASE,
			inject: [ClientGateway],
			useFactory: buildGetClientUseCase,
		},
		{
			provide: CREATE_CLIENT_USE_CASE,
			inject: [ClientGateway],
			useFactory: buildGetClientUseCase,
		},
	],
	controllers: [ClientController],
})
export class ClientModule {}
