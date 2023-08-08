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
import { IGetClientService } from '../../../core/applications/interfaces/get-client.service.interface';
import { GET_CLIENT_SERVICE, CREATE_CLIENT_SERVICE } from '../client.symbols';
import { Response } from 'express';
import CreateClientDto from '../dtos/create-client.dto';
import { ICreateClientService } from 'src/core/applications/interfaces/create-client.service.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('client')
@ApiTags('Client')
export class ClientController {
	constructor(
		@Inject(GET_CLIENT_SERVICE) private readonly getClientService: IGetClientService,
		@Inject(CREATE_CLIENT_SERVICE) private readonly createClientService: ICreateClientService
	) {}

	@Get(':document')
	public async findByDocument(@Res() res: Response, @Param('document', ParseIntPipe) document: string): Promise<void> {
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
	public async createClient(@Res() res: Response, @Body() createClientDTO: CreateClientDto) {
		try {
			const client = await this.createClientService.createClient(createClientDTO)
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
