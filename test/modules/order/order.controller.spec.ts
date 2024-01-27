import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import request from 'supertest';
import { buildCreateOrderUseCase } from '../../../src/domain/application/factories/order/create-order.use-case.factory';
import { buildUpdateOrderUseCase } from '../../../src/domain/application/factories/order/update-order.use-case.factory';
import { ICheckoutGateway } from '../../../src/domain/application/interfaces/checkout/checkout.gateway.interface';
import { IUpdateOrderUseCase } from '../../../src/domain/application/interfaces/order/update-order.use-case.interface';
import { CREATE_ORDER_USE_CASE, UPDATE_ORDER_USE_CASE } from '../../../src/domain/application/symbols/order.symbols';
import { OrderStatusPayment } from '../../../src/domain/enterprise/value-objects/order-status-payment';
import { MercadoPagoExternal } from '../../../src/framework/modules/checkout/mercado-pago.external';
import { OrderController } from '../../../src/framework/modules/order/order.controller';
import { OrderRepository } from '../../../src/framework/modules/order/order.repository';
import { InMemoryOrderRepository } from '../../repositories/in-memory-order.repository';


const moduleMocker = new ModuleMocker(global);

describe('OrderController', () => {
	let checkoutGateway: ICheckoutGateway;
	let inMemoryOrderRepository: InMemoryOrderRepository;
	let updateOrderUseCase: IUpdateOrderUseCase;
	let app: INestApplication;

	beforeEach(async () => {
		checkoutGateway = {
			doPayment: vi.fn(),
			getPayment: vi.fn(),
		}
		inMemoryOrderRepository = new InMemoryOrderRepository()
		process.env.JWT_KEY = 'test'

		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrderController],
			providers: [
				{
					provide: MercadoPagoExternal,
					useValue: checkoutGateway,
				},
				{
					provide: OrderRepository,
					useValue: inMemoryOrderRepository,
				},
				{
					provide: UPDATE_ORDER_USE_CASE,
					inject: [OrderRepository, MercadoPagoExternal],
					useFactory: buildUpdateOrderUseCase,
				},
				{
					provide: CREATE_ORDER_USE_CASE,
					inject: [OrderRepository, MercadoPagoExternal],
					useFactory: buildCreateOrderUseCase,
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

		updateOrderUseCase = module.get(UPDATE_ORDER_USE_CASE)

		await app.init()
	});

	afterEach(() => {
		vi.clearAllMocks();
	})

	describe('[POST] /order/status/payment', () => {
		it('should return a order', async () => {
			const order = await inMemoryOrderRepository.create({
				orderOrigin_id: 1,
				payment_url: 'some_payment_url',
				status_payment: OrderStatusPayment.PROCESSING,
			})

			const spyUpdateStatusPayment = vi.spyOn(updateOrderUseCase, 'updateStatusPayment').mockImplementationOnce(() => {
				return Promise.resolve()
			})

			const response = await request(app.getHttpServer())
				.post(`/order/status/payment`)
				.send({
					data: {
						id: `${order.orderOrigin_id}`,
					}
				});

			expect(response.statusCode).toBe(200)
			expect(spyUpdateStatusPayment).toBeCalledTimes(1)
			expect(spyUpdateStatusPayment).toBeCalledWith({
				data: {
					id: `${order.orderOrigin_id}`,
				}
			})
		});

		it('should return 500', async () => {

			const spyUpdateStatusPayment = vi.spyOn(updateOrderUseCase, 'updateStatusPayment').mockImplementationOnce(() => {
				throw new Error('Test')
			})
			const response = await request(app.getHttpServer())
				.post('/order/status/payment')
				.send();

			expect(response.statusCode).toBe(500)
			expect(spyUpdateStatusPayment).toBeCalledTimes(1)
		});
	})
});
