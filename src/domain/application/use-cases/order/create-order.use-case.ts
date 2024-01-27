import { OrderStatusPayment } from '@/domain/enterprise/value-objects/order-status-payment';
import { CreateOrderDto } from '../../../enterprise/dtos/create-order.dto';
import { ICheckoutGateway } from '../../interfaces/checkout/checkout.gateway.interface';
import { ICreateOrderUseCase } from '../../interfaces/order/create-order.use-case.interface';
import { IOrderRepository } from '../../interfaces/order/order-repository.interface';

export class CreateOrderUseCase implements ICreateOrderUseCase {
	constructor(
		private readonly repository: IOrderRepository,
		private readonly checkoutGateway: ICheckoutGateway,
	) {}

	async create(dto: CreateOrderDto): Promise<void> {
		const { paymentUrl } = await this.checkoutGateway.doPayment(dto.id, dto)
		await this.repository.create({
			orderOrigin_id: dto.id,
			status_payment: OrderStatusPayment.PROCESSING,
			payment_url: paymentUrl,
		});
	}
}
