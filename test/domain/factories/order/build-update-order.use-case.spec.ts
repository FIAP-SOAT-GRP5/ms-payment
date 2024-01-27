import { UpdateOrderUseCase } from "@/domain/application/use-cases/order/update-order.use-case";
import { buildUpdateOrderUseCase } from "../../../../src/domain/application/factories/order/update-order.use-case.factory";
import { IPaymentOrderUseCase } from "../../../../src/domain/application/interfaces/order/payment-order.use-case.interface";
import { InMemoryOrderRepository } from "../../../repositories/in-memory-order.repository";

let inMemoryOrderRepository: InMemoryOrderRepository;
let paymentOrderUseCase: IPaymentOrderUseCase;
let updateOrderUseCase: UpdateOrderUseCase;

describe("buildUpdateOrderUseCase", () => {

	beforeEach(() => {
		paymentOrderUseCase = {
			getPayment: vi.fn(),
		}

		inMemoryOrderRepository = new InMemoryOrderRepository()
		updateOrderUseCase = new UpdateOrderUseCase(inMemoryOrderRepository, paymentOrderUseCase)
	})

	it("should update a class", async () => {
		const useCase = buildUpdateOrderUseCase(inMemoryOrderRepository, paymentOrderUseCase)

		expect(useCase).toBeDefined()
	})
})