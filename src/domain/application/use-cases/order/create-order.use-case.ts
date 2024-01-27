import { CreatedPaymentDto } from '@/domain/enterprise/dtos/created-payment.dto';
import { OrderStatusPayment } from '@/domain/enterprise/value-objects/order-status-payment';
import { CreateOrderDto } from '../../../enterprise/dtos/create-order.dto';
import { ICheckoutGateway } from '../../interfaces/checkout/checkout.gateway.interface';
import { ICreateOrderUseCase } from '../../interfaces/order/create-order.use-case.interface';
import { IOrderRepository } from '../../interfaces/order/order-repository.interface';
import { IQueueGateway } from '../../interfaces/queue/queue.gateway.interface';

export class CreateOrderUseCase implements ICreateOrderUseCase {
	constructor(
		private readonly repository: IOrderRepository,
		private readonly checkoutGateway: ICheckoutGateway,
		private readonly queueGateway: IQueueGateway,
	) {}

	async create(dto: CreateOrderDto): Promise<CreatedPaymentDto> {
		const paymentUrl = await this.checkoutGateway.doPayment(dto.order.id, dto.order)
		const order = {
			id: dto.order.id,
			status_payment: OrderStatusPayment.PROCESSING,
		}
		await this.repository.create(order);

		const createdOrderWithPayment = {
			order: dto.order,
			...paymentUrl
		}
		console.log(this.queueGateway)
		// await this.queueGateway.send(createdOrderWithPayment);
		
		return createdOrderWithPayment;
	}
}
