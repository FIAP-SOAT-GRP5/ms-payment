import { ICheckoutGateway } from "@/domain/application/interfaces/checkout/checkout.gateway.interface";
import { makeOrderToCreate } from "test/factories/makeOrder";
import { CreateOrderUseCase } from "../../../../src/domain/application/use-cases/order/create-order.use-case";
import { InMemoryOrderRepository } from "../../../repositories/in-memory-order.repository";

let inMemoryOrderRepository: InMemoryOrderRepository;
let checkoutGateway: ICheckoutGateway;
let sut: CreateOrderUseCase;

describe("CreateOrderUseCase", () => {

	beforeEach(() => {
		checkoutGateway = {
			doPayment: vi.fn().mockImplementation(() => {
				return {
					paymentUrl: 'some_payment_url'
				}
			}),
			getPayment: vi.fn(),
		}
		inMemoryOrderRepository = new InMemoryOrderRepository()
		sut = new CreateOrderUseCase(inMemoryOrderRepository, checkoutGateway)
	})

	it("should be able to create a order", async () => {
		const order = makeOrderToCreate()

		await sut.create(order)

		expect(inMemoryOrderRepository.orders).toHaveLength(1)
		expect(checkoutGateway.doPayment).toBeCalledTimes(1)
	})
})