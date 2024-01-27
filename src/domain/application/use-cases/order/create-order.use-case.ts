import { Order } from '@/domain/enterprise/entities/order.entity';
import { OrderStatusPayment } from '@/domain/enterprise/value-objects/order-status-payment';
import { CreateOrderDto } from '../../../enterprise/dtos/create-order.dto';
import { ICreateOrderUseCase } from '../../interfaces/order/create-order.use-case.interface';
import { IOrderRepository } from '../../interfaces/order/order-repository.interface';
import { IQueueGateway } from '../../interfaces/queue/queue.gateway.interface';

export class CreateOrderUseCase implements ICreateOrderUseCase {
	constructor(
		private readonly repository: IOrderRepository,
		private readonly queueGateway: IQueueGateway,
	) {}

	async create(dto: CreateOrderDto): Promise<Order> {
		const order = {
			id: dto.order.id,
			status_payment: OrderStatusPayment.PROCESSING,
		}
		console.log(this.queueGateway)
		// incluir chamada mercado pago
		// await this.queueGateway.send(order);
		
		return this.repository.create(order);
	}
}
