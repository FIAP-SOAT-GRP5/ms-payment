import { ICheckoutGateway } from "@/domain/application/interfaces/checkout/checkout.gateway.interface";
import { CreateOrderUseCase } from "@/domain/application/use-cases/order/create-order.use-case";
import { buildCreateOrderUseCase } from "../../../../src/domain/application/factories/order/create-order.use-case.factory";
import { InMemoryOrderRepository } from "../../../repositories/in-memory-order.repository";

let inMemoryOrderRepository: InMemoryOrderRepository;
let checkoutGateway: ICheckoutGateway;
let createOrderUseCase: CreateOrderUseCase;

describe("buildCreateOrderUseCase", () => {

	beforeEach(() => {
		checkoutGateway = {
			doPayment: vi.fn(),
			getPayment: vi.fn(),
		}

		inMemoryOrderRepository = new InMemoryOrderRepository()
		createOrderUseCase = new CreateOrderUseCase(inMemoryOrderRepository, checkoutGateway)
	})

	it("should create a class", async () => {
		const useCase = buildCreateOrderUseCase(inMemoryOrderRepository, checkoutGateway)
		expect(useCase).toBeDefined()
	})
})