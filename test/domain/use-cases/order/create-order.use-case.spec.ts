import { ICheckoutGateway } from "@/domain/application/interfaces/checkout/checkout.gateway.interface";
import { makeOrderToCreate } from "test/factories/makeOrder";
import { IQueueGateway } from "../../../../src/domain/application/interfaces/queue/queue.gateway.interface";
import { CreateOrderUseCase } from "../../../../src/domain/application/use-cases/order/create-order.use-case";
import { InMemoryOrderRepository } from "../../../repositories/in-memory-order.repository";

let queueGateway: IQueueGateway;
let checkoutGateway: ICheckoutGateway;
let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: CreateOrderUseCase;

describe("CreateOrderUseCase", () => {

	beforeEach(() => {
		queueGateway = {
			send: vi.fn(),
		}
		checkoutGateway = {
			doPayment: vi.fn(),
			getPayment: vi.fn(),
		}
		inMemoryOrderRepository = new InMemoryOrderRepository()
		sut = new CreateOrderUseCase(inMemoryOrderRepository, checkoutGateway, queueGateway)
	})

	it("should be able to create a order", async () => {
		const order = makeOrderToCreate()

		await inMemoryOrderRepository.create(order)

		// expect(response.id).toBeDefined()
		// expect(inMemoryOrderRepository.orders).toHaveLength(1)
	})

	it("should not be able to create a order without items", async () => {
		// await expect(sut.create({
		// 	clientId: 1,
		// 	itemsIds: [],
		// })).rejects.toThrowError(OrderWithoutItemsError)
	})
})