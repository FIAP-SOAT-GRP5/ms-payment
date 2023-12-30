import { CreateOrderResponse } from '../../dtos/create-order-response.dto';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { OrderWithoutItemsError } from '../../errors/order-without-items.error';
import { IGetItemUseCase } from '../../interfaces/Item/get-item.use-case.interface';
import { ICreateOrderUseCase } from '../../interfaces/order/create-order.use-case.interface';
import { IOrderGateway } from '../../interfaces/order/order.gateway.interface';
import { OrderStatus } from '../../value-objects/order-status';

export class CreateOrderUseCase implements ICreateOrderUseCase {
	constructor(
		private readonly orderGateway: IOrderGateway,
		private readonly getItemUseCase: IGetItemUseCase,
	) {}

	async create(dto: CreateOrderDto): Promise<CreateOrderResponse> {
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

		const order = await this.orderGateway.create({
			client: {
				id: dto.clientId
			},
			status: OrderStatus.AWAITING_PAYMENT,
			orderItems: items.map((item) => ({
				item: {
					id: item.id,
					name: item.name
				},
				price: item.price,
				quantity: item.quantity
			})),
		});
		// TODO: Call RabbitMQ
		return order;
	}
}
