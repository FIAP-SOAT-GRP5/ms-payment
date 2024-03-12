import { buildUpdateClientToAnonymousUseCase } from '@/domain/application/factories/client/update-client-to-anonymous.use-case.factory';
import { IUpdateClientToAnonymousUseCase } from '@/domain/application/interfaces/client/update-client-to-anonymous.use-case.interface';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import request from 'supertest';
import { buildCreateClientUseCase } from '../../../src/domain/application/factories/client/create-client.use-case.factory';
import { buildGetClientUseCase } from '../../../src/domain/application/factories/client/get-client.use-case.factory';
import { ICreateClientUseCase } from '../../../src/domain/application/interfaces/client/create-client.use-case.interface';
import { IGetClientUseCase } from '../../../src/domain/application/interfaces/client/get-client.use-case.interface';
import { CREATE_CLIENT_USE_CASE, GET_CLIENT_USE_CASE, UPDATE_CLIENT_TO_ANONYMOUS_USE_CASE } from '../../../src/domain/application/symbols/client.symbols';
import { ClientController } from '../../../src/framework/modules/client/client.controller';
import { ClientRepository } from '../../../src/framework/modules/client/client.repository';
import { CreateClientDto } from '../../../src/framework/modules/client/dtos/create-client.dto';
import { makeClient } from '../../factories/makeClient';
import { InMemoryClientRepository } from '../../repositories/in-memory-client.repository';


const moduleMocker = new ModuleMocker(global);

describe('ClientController', () => {
	let inMemoryClientRepository: InMemoryClientRepository;
	let getClientUseCase: IGetClientUseCase;
	let createClientUseCase: ICreateClientUseCase;
	let updateClientToAnonymousUseCase: IUpdateClientToAnonymousUseCase
	let app: INestApplication;

	beforeEach(async () => {
		inMemoryClientRepository = new InMemoryClientRepository()
		process.env.JWT_KEY = 'test'

		const module: TestingModule = await Test.createTestingModule({
			controllers: [ClientController],
			providers: [
				{
					provide: ClientRepository,
					useValue: inMemoryClientRepository,
				},
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
				{
					provide: UPDATE_CLIENT_TO_ANONYMOUS_USE_CASE,
					inject: [ClientRepository],
					useFactory: buildUpdateClientToAnonymousUseCase,
				},
			]
		}).useMocker((token) => {
			if (typeof token === 'function') {
				const mockMetadata = moduleMocker.getMetadata(
					token
				) as MockFunctionMetadata<any, any>;
				const Mock = moduleMocker.generateFromMetadata(mockMetadata);
				return new Mock();
			}
		}).compile();

		app = module.createNestApplication()

		getClientUseCase = module.get(GET_CLIENT_USE_CASE)
		createClientUseCase = module.get(CREATE_CLIENT_USE_CASE)
		updateClientToAnonymousUseCase = module.get(UPDATE_CLIENT_TO_ANONYMOUS_USE_CASE)

		await app.init()
	});

	afterEach(() => {
		vi.clearAllMocks();
	})

	describe('[GET] /client/:document', () => {
		it('should return a client', async () => {
			const client = await inMemoryClientRepository.createClient(makeClient())
			const spyClientByDocument = vi.spyOn(getClientUseCase, 'getClientByDocument')

			const response = await request(app.getHttpServer())
				.get(`/client/${client.document}`)
				.send();

			expect(response.statusCode).toBe(200)
			expect(response.body.client).toBeDefined()
			expect(spyClientByDocument).toHaveBeenCalled()
		});

		it('should return 404', async () => {
			const response = await request(app.getHttpServer())
				.get('/client/12345678901')
				.send();
			expect(response.statusCode).toBe(404)
		});

		it('should return 500', async () => {
			vi.spyOn(getClientUseCase, 'getClientByDocument').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.get('/client/1')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})

	describe('[GET] /client', () => {
		it('should return a list of clients', async () => {
			await inMemoryClientRepository.createClient(makeClient())

			const spyListAllClients = vi.spyOn(getClientUseCase, 'findAll')

			const response = await request(app.getHttpServer())
				.get('/client')
				.send();

			expect(response.body.list).toHaveLength(1)
			expect(response.statusCode).toBe(200)
			expect(spyListAllClients).toHaveBeenCalled()
		});

		it('should return 500', async () => {
			vi.spyOn(getClientUseCase, 'findAll').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.get('/client')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})

	describe('[POST] /client', () => {
		it('should create a client', async () => {
			const dto: CreateClientDto = {
				document: '12345678901',
				email: 'teste@teste.com',
				name: 'teste'
			}
			const spyCreateClient = vi.spyOn(createClientUseCase, 'createClient')

			const response = await request(app.getHttpServer())
				.post('/client')
				.send(dto);

			expect(response.body.client).toBeDefined()
			expect(response.statusCode).toBe(201)
			expect(spyCreateClient).toHaveBeenCalled()
		});

		it('should return 500', async () => {
			vi.spyOn(createClientUseCase, 'createClient').mockImplementationOnce(() => {
				throw new Error('Test')
			})

			const response = await request(app.getHttpServer())
				.post('/client')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})

	describe('[PUT] /client/:id', () => {
		it('should update client', async () => {
			const client = await inMemoryClientRepository.createClient(makeClient())

			const spyCreateClient = vi.spyOn(updateClientToAnonymousUseCase, 'updateClient')

			const response = await request(app.getHttpServer())
				.put(`/client/${client._id}`)
				.send();
				
			expect(response.body.client).toBeDefined()
			expect(response.body.client.name).toBe('')
			expect(response.body.client.email).toBe('')
			expect(response.body.client.document).toBe('12345678909')
			expect(response.statusCode).toBe(201)
			expect(spyCreateClient).toHaveBeenCalled()
		});

		it('should return 500', async () => {
			vi.spyOn(updateClientToAnonymousUseCase, 'updateClient').mockImplementationOnce(() => {
				throw new Error('Test')
			})

			const response = await request(app.getHttpServer())
				.put('/client/error-test')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})
});
