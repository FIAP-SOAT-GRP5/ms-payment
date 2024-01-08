import { buildCreateOrderUseCase } from "../../../../src/domain/application/factories/order/create-order.use-case.factory";
import { IQueueGateway } from "../../../../src/domain/application/interfaces/queue/queue.gateway.interface";
import { GetItemUseCase } from "../../../../src/domain/application/use-cases/item/get-item.use-case";
import { InMemoryItemRepository } from "../../../repositories/in-memory-item.repository";
import { InMemoryOrderRepository } from "../../../repositories/in-memory-order.repository";

let queueGateway: IQueueGateway;
let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryItemRepository: InMemoryItemRepository;
let getItemUseCase: GetItemUseCase;

describe("buildCreateOrderUseCase", () => {

	beforeEach(() => {
		queueGateway = {
			send: vi.fn(),
		}
		inMemoryOrderRepository = new InMemoryOrderRepository()
		inMemoryItemRepository = new InMemoryItemRepository()
		getItemUseCase = new GetItemUseCase(inMemoryItemRepository)
	})

	it("should create a class", async () => {
		const useCase = buildCreateOrderUseCase(inMemoryOrderRepository, getItemUseCase, queueGateway)

		expect(useCase).toBeDefined()
	})
})