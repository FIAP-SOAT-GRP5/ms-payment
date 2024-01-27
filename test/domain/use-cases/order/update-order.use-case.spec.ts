import { IPaymentOrderUseCase } from "../../../../src/domain/application/interfaces/order/payment-order.use-case.interface";
import { UpdateOrderUseCase } from "../../../../src/domain/application/use-cases/order/update-order.use-case";
import { OrderStatusPayment } from "../../../../src/domain/enterprise/value-objects/order-status-payment";
import { InMemoryOrderRepository } from "../../../repositories/in-memory-order.repository";

let inMemoryOrderRepository: InMemoryOrderRepository;
let paymentOrderUseCase: IPaymentOrderUseCase;
let sut: UpdateOrderUseCase;

describe("UpdateOrderUseCase", () => {

	beforeEach(() => {
		paymentOrderUseCase = {
			getPayment: vi.fn().mockImplementation((id) => {
				if (id === 1) {
					return {
						order_id: 1,
						status: 'approved',
					}
				}
				return {
					order_id: 2,
					status: 'rejected',
				}
			}),
		}

		inMemoryOrderRepository = new InMemoryOrderRepository()
		sut = new UpdateOrderUseCase(inMemoryOrderRepository, paymentOrderUseCase)
	})

	it("should be able to update approved order", async () => {
		const spyApproved = vi.spyOn(inMemoryOrderRepository, 'updateOrderStatusPaymentApproved')
		const spyRefused = vi.spyOn(inMemoryOrderRepository, 'updateOrderStatusPaymentRefused')
		const order = await inMemoryOrderRepository.create({
			orderOrigin_id: 1,
			payment_url: 'some_payment_url',
			status_payment: OrderStatusPayment.PROCESSING,
		})

		await sut.updateStatusPayment({
			data: {
				id: `${order.orderOrigin_id}`,
			}
		})

		expect(spyApproved).toBeCalledTimes(1)
		expect(spyRefused).toBeCalledTimes(0)
	})

	it("should be able to update rejected order", async () => {
		const spyApproved = vi.spyOn(inMemoryOrderRepository, 'updateOrderStatusPaymentApproved')
		const spyRefused = vi.spyOn(inMemoryOrderRepository, 'updateOrderStatusPaymentRefused')
		const order = await inMemoryOrderRepository.create({
			orderOrigin_id: 2,
			payment_url: 'some_payment_url',
			status_payment: OrderStatusPayment.PROCESSING,
		})

		await sut.updateStatusPayment({
			data: {
				id: `${order.orderOrigin_id}`,
			}
		})

		expect(spyRefused).toBeCalledTimes(1)
		expect(spyApproved).toBeCalledTimes(0)
	})

})