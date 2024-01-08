import { OrderWithoutItemsError } from "../../../../src/core/errors/order-without-items.error";
import { IQueueGateway } from "../../../../src/domain/application/interfaces/queue/queue.gateway.interface";
import { GetItemUseCase } from "../../../../src/domain/application/use-cases/item/get-item.use-case";
import { CreateOrderUseCase } from "../../../../src/domain/application/use-cases/order/create-order.use-case";
import { CreateOrderDto } from "../../../../src/domain/enterprise/dtos/create-order.dto";
import { makeDrinkCategory } from "../../../factories/makeCategory";
import { makeItem } from "../../../factories/makeItem";
import { InMemoryItemRepository } from "../../../repositories/in-memory-item.repository";
import { InMemoryOrderRepository } from "../../../repositories/in-memory-order.repository";

let queueGateway: IQueueGateway;
let inMemoryItemRepository: InMemoryItemRepository;
let getItemUseCase: GetItemUseCase;
let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: CreateOrderUseCase;

describe("CreateOrderUseCase", () => {

	beforeEach(() => {
		queueGateway = {
			send: vi.fn(),
		}
		inMemoryItemRepository = new InMemoryItemRepository()
		getItemUseCase = new GetItemUseCase(inMemoryItemRepository)
		inMemoryOrderRepository = new InMemoryOrderRepository()
		sut = new CreateOrderUseCase(inMemoryOrderRepository, getItemUseCase, queueGateway)
	})

	it("should be able to create a order", async () => {
		const item = makeItem()
		const category = makeDrinkCategory()
		item.category = category
		await inMemoryItemRepository.createItem(item)

		const dto = new CreateOrderDto()
		dto.clientId = 1
		dto.itemsIds = [{
			id: item.id,
			quantity: 1,
		}]

		const response = await sut.create(dto);

		expect(response.id).toBeDefined()
		expect(inMemoryOrderRepository.orders).toHaveLength(1)
	})

	it("should not be able to create a order without items", async () => {
		await expect(sut.create({
			clientId: 1,
			itemsIds: [],
		})).rejects.toThrowError(OrderWithoutItemsError)
	})
})