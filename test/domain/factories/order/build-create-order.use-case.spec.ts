import { buildCreateOrderUseCase } from "../../../../src/domain/application/factories/order/create-order.use-case.factory";
import { GetItemUseCase } from "../../../../src/domain/application/use-cases/item/get-item.use-case";
import { InMemoryItemRepository } from "../../../repositories/in-memory-item.repository";
import { InMemoryOrderRepository } from "../../../repositories/in-memory-order.repository";

let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryItemRepository: InMemoryItemRepository;
let getItemUseCase: GetItemUseCase;

describe("buildCreateOrderUseCase", () => {

	beforeEach(() => {
		inMemoryOrderRepository = new InMemoryOrderRepository()
		inMemoryItemRepository = new InMemoryItemRepository()
		getItemUseCase = new GetItemUseCase(inMemoryItemRepository)
	})

	it("should create a class", async () => {
		const useCase = buildCreateOrderUseCase(inMemoryOrderRepository, getItemUseCase)

		expect(useCase).toBeDefined()
	})
})