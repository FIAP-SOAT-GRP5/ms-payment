import { ICreateClientUseCase } from '@/domain/application/interfaces/client/create-client.use-case.interface';
import { IGetClientUseCase } from '@/domain/application/interfaces/client/get-client.use-case.interface';
import { IUpdateClientToAnonymousUseCase } from '@/domain/application/interfaces/client/update-client-to-anonymous.use-case.interface';
import { CREATE_CLIENT_USE_CASE, GET_CLIENT_USE_CASE, UPDATE_CLIENT_TO_ANONYMOUS_USE_CASE } from '@/domain/application/symbols/client.symbols';
import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateClientDto } from './dtos/create-client.dto';

@Controller('client')
@ApiTags('Client')
export class ClientController {
	constructor(
		@Inject(GET_CLIENT_USE_CASE)
		private readonly getClientUseCase: IGetClientUseCase,
		@Inject(CREATE_CLIENT_USE_CASE)
		private readonly createClientUseCase: ICreateClientUseCase,
		@Inject(UPDATE_CLIENT_TO_ANONYMOUS_USE_CASE)
		private readonly updateClientToAnonymousUseCase: IUpdateClientToAnonymousUseCase,
	) {}

	@Get()
	public async findAllClient(@Res() res: Response): Promise<void> {
		try {
			const list = await this.getClientUseCase.findAll();
			res.status(200).send({ list });
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
			const client = await this.getClientUseCase.getClientByDocument(document);
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
	public async create(
		@Res() res: Response,
		@Body() body: CreateClientDto
	): Promise<void> {
		try {
			const createdClient = await this.createClientUseCase.createClient(body);
			res.status(201).send({ client: createdClient });
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Put(':id')
	public async updateToAnonymous(
		@Param('id') id: string,
		@Res() res: Response
	): Promise<void> {
		try {
			const updatedClient = await this.updateClientToAnonymousUseCase.updateClient(id);
			res.status(201).send({ client: updatedClient });
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}