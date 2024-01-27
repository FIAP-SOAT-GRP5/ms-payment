import { GetOrderUseCase } from "../../../../src/domain/application/use-cases/order/get-order.use-case";
import { makeOrderToCreate } from "../../../factories/makeOrder";
import { InMemoryOrderRepository } from "../../../repositories/in-memory-order.repository";

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: GetOrderUseCase;

describe("UpdateOrderUseCase", () => {

	beforeEach(() => {
		inMemoryOrderRepository = new InMemoryOrderRepository()
		sut = new GetOrderUseCase(inMemoryOrderRepository)
	})

	it("should be able to find order by id", async () => {
		// const orderToCreate = makeOrderToCreate()
		// const order = await inMemoryOrderRepository.create(orderToCreate)

		// const response = await sut.findById(order.id);

		// expect(response.id).toBeDefined()
	})

	it("should be able to find all orders", async () => {
		// const orderToCreate = makeOrderToCreate()
		// await inMemoryOrderRepository.create(orderToCreate)

		// const response = await sut.listAllOrders();

		// expect(response).toHaveLength(1)
	})

	it("should be able to find all processing orders", async () => {
		
	})
	
	it("should be able to find all approved orders", async () => {
		
	})

	it("should be able to find all refused orders", async () => {
		
	})

})