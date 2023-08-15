import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { IGetClientService } from '../../../core/applications/interfaces/get-client.service.interface';

import CreateClientDto from '../dtos/create-client.dto';

import { GET_CLIENT_SERVICE, CREATE_CLIENT_SERVICE } from '../client.symbols';
import { ICreateClientService } from 'src/core/applications/interfaces/create-client.service.interface';

@Controller('client')
@ApiTags('Client')
export class ClientController {
	constructor(
		@Inject(GET_CLIENT_SERVICE)
		private readonly getClientService: IGetClientService,
		@Inject(CREATE_CLIENT_SERVICE)
		private readonly createClientService: ICreateClientService
	) {}

	@Get()
	public async findAllClient(@Res() res: Response): Promise<void> {
		try {
			const client = await this.getClientService.findAllClient();
			if (!client) {
				res.status(404).send('Client not found');
			} else {
				res.status(200).send({ client });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Get(':document')
	public async findByDocument(
		@Res() res: Response,
		@Param('document', ParseIntPipe) document: string
	): Promise<void> {
		try {
			const client = await this.getClientService.findByDocument(document);
			if (!client) {
				res.status(404).send('Client not found');
			} else {
				res.status(200).send({ client });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Post()
	public async createClient(
		@Res() res: Response,
		@Body() createClientDTO: CreateClientDto
	) {
		try {
			const client = await this.createClientService.createClient(createClientDTO);
			if (!client) {
				res.status(404).send('Client not created');
			} else {
				res.status(200).send({ client });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}
