import { Module } from '@nestjs/common';
import { ClientController } from './driver/client.controller';
import { GET_CLIENT_SERVICE, CREATE_CLIENT_SERVICE } from './client.symbols';
import { ClientRepository } from './driven/client.repository';
import { buildGetClientService } from './factories/get-client.service.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../../core/domain/client.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Client])],
	providers: [
		ClientRepository,
		{
			provide: GET_CLIENT_SERVICE,
			inject: [ClientRepository],
			useFactory: buildGetClientService,
		},	
		{
			provide: CREATE_CLIENT_SERVICE,
			inject: [ClientRepository],
			useFactory: buildGetClientService,
		},	
	],
	controllers: [ClientController],
})
export class ClientModule {}
