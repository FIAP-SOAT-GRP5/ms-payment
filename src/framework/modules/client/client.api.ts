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
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ClientController } from '../../../domain/controllers/client.controller';
import { CLIENT_CONTROLLER } from '../../../domain/symbols/client.symbols';
import CreateClientDto from './dtos/create-client.dto';

@Controller('client')
@ApiTags('Client')
export class ClientApi {
	constructor(
		@Inject(CLIENT_CONTROLLER)
		private readonly clientController: ClientController
	) {}

	@Get()
	public async findAllClient(@Res() res: Response): Promise<void> {
		try {
			const client = await this.clientController.findAllClient();
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
			const client = await this.clientController.findByDocument(document);
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
			const client = await this.clientController.createClient(createClientDTO);
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
