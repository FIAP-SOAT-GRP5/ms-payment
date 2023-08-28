import { CreateOrderDto } from '../../dtos/create-order.dto';
import { Order } from '../../entities/order.entity';
import { OrderWithoutItemsError } from '../../errors/order-without-items.error';
import { IGetItemUseCase } from '../../interfaces/Item/get-item.use-case.interface';
import { ICheckoutGateway } from '../../interfaces/checkout/checkout.gateway.interface';
import { ICreateOrderUseCase } from '../../interfaces/order/create-order.use-case.interface';
import { IOrderGateway } from '../../interfaces/order/order.gateway.interface';
import { OrderStatus } from '../../value-objects/order-status';
import { PaymentStatus } from '../../value-objects/payment-status';

export class CreateOrderUseCase implements ICreateOrderUseCase {
	constructor(
		private readonly orderGateway: IOrderGateway,
		private readonly getItemUseCase: IGetItemUseCase,
		private readonly checkoutGateway: ICheckoutGateway,
	) {}

	async create(dto: CreateOrderDto): Promise<Order> {
		const items = await Promise.all(
			dto.itemsIds.map(async (item) => {
				const itemEntity = await this.getItemUseCase.findById(item.id);
				return {
					quantity: item.quantity,
					price: itemEntity.price,
					id: itemEntity.id,
					name: itemEntity.name
				};
			})
		);
		if (items.length === 0) throw new OrderWithoutItemsError();

		const data = {
			client: { id: dto.clientId },
			status: OrderStatus.AWAITING_PAYMENT,
			status_payment: PaymentStatus.PROCESSING,
			orderItems: items.map((item) => ({
				item: { id: item.id, name: item.name },
				price: item.price,
				quantity: item.quantity
			})),
		};
		const order = await this.orderGateway.create(data);
		const paymentUrl = await this.checkoutGateway.doPayment(order.id, data);
		const response = {
			...order,
			...paymentUrl
		}

		return response;
	}
}
