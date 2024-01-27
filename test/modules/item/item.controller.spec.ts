import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import request from 'supertest';
import { buildCreateItemUseCase } from '../../../src/domain/application/factories/item/create-item.use-case.factory';
import { buildGetItemUseCase } from '../../../src/domain/application/factories/item/get-item.use-case.factory';
import { buildUpdateItemUseCase } from '../../../src/domain/application/factories/item/update-item.use-case.factory';
import { ICreateItemUseCase } from '../../../src/domain/application/interfaces/Item/create-item.use-case.interface';
import { IGetItemUseCase } from '../../../src/domain/application/interfaces/Item/get-item.use-case.interface';
import { IUpdateItemUseCase } from '../../../src/domain/application/interfaces/Item/update-item.use-case.interface';
import { CREATE_ITEM_USE_CASE, GET_ITEM_USE_CASE, UPDATE_ITEM_USE_CASE } from '../../../src/domain/application/symbols/item.symbols';
import { CreateItemDto } from '../../../src/framework/modules/item/dtos/create-item.dto';
import { UpdateItemDto } from '../../../src/framework/modules/item/dtos/update-item.dto';
import { ItemController } from '../../../src/framework/modules/item/item.controller';
import { ItemRepository } from '../../../src/framework/modules/item/item.repository';
import { makeDessertCategory, makeDrinkCategory, makeFollowUpCategory, makeSnackCategory } from '../../factories/makeCategory';
import { makeItem } from '../../factories/makeClient';
import { InMemoryItemRepository } from '../../repositories/in-memory-client.repository';


const moduleMocker = new ModuleMocker(global);

describe('ItemController', () => {
	let inMemoryItemRepository: InMemoryItemRepository;
	let getItemUseCase: IGetItemUseCase;
	let createItemUseCase: ICreateItemUseCase;
	let updateItemUseCase: IUpdateItemUseCase;
	let itemController: ItemController;
	let app: INestApplication;

	beforeEach(async () => {
		inMemoryItemRepository = new InMemoryItemRepository()

		const module: TestingModule = await Test.createTestingModule({
			controllers: [ItemController],
			providers: [
				{
					provide: ItemRepository,
					useValue: inMemoryItemRepository,
				},
				{
					provide: GET_ITEM_USE_CASE,
					inject: [ItemRepository],
					useFactory: buildGetItemUseCase,
				},
				{
					provide: CREATE_ITEM_USE_CASE,
					inject: [ItemRepository],
					useFactory: buildCreateItemUseCase,
				},
				{
					provide: UPDATE_ITEM_USE_CASE,
					inject: [ItemRepository],
					useFactory: buildUpdateItemUseCase,
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

		getItemUseCase = module.get(GET_ITEM_USE_CASE)
		createItemUseCase = module.get(CREATE_ITEM_USE_CASE)
		updateItemUseCase = module.get(UPDATE_ITEM_USE_CASE)
		itemController = module.get(ItemController)

		await app.init()
	});

	afterEach(() => {
		vi.clearAllMocks();
	})

	describe('[GET] /item/getItemBySnack', () => {
		it('should return a list with one item', async () => {
			const item = makeItem()
			const category = makeSnackCategory()
			item.category = category
			await inMemoryItemRepository.createItem(item)

			const spyGetItemBySnack = vi.spyOn(getItemUseCase, 'getItemBySnack')

			const response = await request(app.getHttpServer())
				.get('/item/getItemBySnack')
				.send();

			expect(response.body.items).toHaveLength(1)
			expect(response.statusCode).toBe(200)
			expect(spyGetItemBySnack).toHaveBeenCalled()
		});

		it('should return 500', async () => {
			vi.spyOn(getItemUseCase, 'getItemBySnack').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.get('/item/getItemBySnack')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})

	describe('[GET] /item/getItemByDrink', () => {
		it('should return a list with one item', async () => {
			const item = makeItem()
			const category = makeDrinkCategory()
			item.category = category
			await inMemoryItemRepository.createItem(item)

			const spyGetItemByDrink = vi.spyOn(getItemUseCase, 'getItemByDrink')

			const response = await request(app.getHttpServer())
				.get('/item/getItemByDrink')
				.send();

			expect(response.body.items).toHaveLength(1)
			expect(response.statusCode).toBe(200)
			expect(spyGetItemByDrink).toHaveBeenCalled()
		});

		it('should return 500', async () => {
			vi.spyOn(getItemUseCase, 'getItemByDrink').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.get('/item/getItemByDrink')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})

	describe('[GET] /item/getItemByDessert', () => {
		it('should return a list with one item', async () => {
			const item = makeItem()
			const category = makeDessertCategory()
			item.category = category
			await inMemoryItemRepository.createItem(item)

			const spyGetItemByDessert = vi.spyOn(getItemUseCase, 'getItemByDessert')

			const response = await request(app.getHttpServer())
				.get('/item/getItemByDessert')
				.send();

			expect(response.body.items).toHaveLength(1)
			expect(response.statusCode).toBe(200)
			expect(spyGetItemByDessert).toHaveBeenCalled()
		});

		it('should return 500', async () => {
			vi.spyOn(getItemUseCase, 'getItemByDessert').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.get('/item/getItemByDessert')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})

	describe('[GET] /item/getItemByFollowUp', () => {
		it('should return a list with one item', async () => {
			const item = makeItem()
			const category = makeFollowUpCategory()
			item.category = category
			await inMemoryItemRepository.createItem(item)

			const spyGetItemByFollowUp = vi.spyOn(getItemUseCase, 'getItemByFollowUp')

			const response = await request(app.getHttpServer())
				.get('/item/getItemByFollowUp')
				.send();

			expect(response.body.items).toHaveLength(1)
			expect(response.statusCode).toBe(200)
			expect(spyGetItemByFollowUp).toHaveBeenCalled()
		});

		it('should return 500', async () => {
			vi.spyOn(getItemUseCase, 'getItemByFollowUp').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.get('/item/getItemByFollowUp')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})

	describe('[GET] /item/:id', () => {
		it('should return a item', async () => {
			const item = makeItem()
			await inMemoryItemRepository.createItem(item)

			const spyFindById = vi.spyOn(getItemUseCase, 'findById')

			const response = await request(app.getHttpServer())
				.get(`/item/${item.id}`)
				.send();

			expect(response.body.item).toBeDefined()
			expect(response.statusCode).toBe(200)
			expect(spyFindById).toHaveBeenCalled()
		});

		it('should return 404', async () => {
			const response = await request(app.getHttpServer())
				.get('/item/1')
				.send();
			expect(response.statusCode).toBe(404)
		});

		it('should return 500', async () => {
			vi.spyOn(getItemUseCase, 'findById').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.get('/item/1')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})

	describe('[POST] /item', () => {
		it('should create a item', async () => {
			const dto: CreateItemDto = {
				name: 'Test',
				description: 'Test',
				price: 10,
				category_id: 1
			}
			const spyCreateItem = vi.spyOn(createItemUseCase, 'createItem')

			const response = await request(app.getHttpServer())
				.post('/item')
				.send(dto);

			expect(response.body.item).toBeDefined()
			expect(response.statusCode).toBe(201)
			expect(spyCreateItem).toHaveBeenCalled()
		});

		it('should return 500', async () => {
			vi.spyOn(createItemUseCase, 'createItem').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.post('/item')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})

	describe('[PUT] /item/:id', () => {
		it('should update a item', async () => {
			const item = makeItem()
			await inMemoryItemRepository.createItem(item)

			const dto: UpdateItemDto = {
				name: 'Test',
				description: 'Test',
				price: 10,
				category_id: 1
			}
			const spyUpdateItem = vi.spyOn(updateItemUseCase, 'updateItem')

			const response = await request(app.getHttpServer())
				.put(`/item/${item.id}`)
				.send(dto);

			expect(response.body.item).toBeDefined()
			expect(response.statusCode).toBe(200)
			expect(spyUpdateItem).toHaveBeenCalled()
		});

		it('should return 404', async () => {
			const response = await request(app.getHttpServer())
				.put('/item/1')
				.send();
			expect(response.statusCode).toBe(404)
		});

		it('should return 500', async () => {
			vi.spyOn(updateItemUseCase, 'updateItem').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.put('/item/1')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})

	describe('[GET] /item', () => {
		it('should return a list with one item', async () => {
			const item = makeItem()
			await inMemoryItemRepository.createItem(item)

			const spyFindAll = vi.spyOn(getItemUseCase, 'findAll')

			const response = await request(app.getHttpServer())
				.get('/item')
				.send();

			expect(response.body.items).toHaveLength(1)
			expect(response.statusCode).toBe(200)
			expect(spyFindAll).toHaveBeenCalled()
		});

		it('should return 500', async () => {
			vi.spyOn(getItemUseCase, 'findAll').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.get('/item')
				.send();
			expect(response.statusCode).toBe(500)
		});
	})
});
