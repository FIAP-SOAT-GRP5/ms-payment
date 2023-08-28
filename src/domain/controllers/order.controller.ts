import { IUpdateOrderPaymentUseCase } from 'src/domain/interfaces/order/update-order-payment.use-case.interface';
import { CreateOrderBodyDto } from '../../framework/modules/order/dtos/create-order.dto';
import { Order } from '../entities/order.entity';
import { ICreateOrderUseCase } from '../interfaces/order/create-order.use-case.interface';
import { IGetOrderUseCase } from '../interfaces/order/get-order.use-case.interface';
import { IUpdateOrderStatusUseCase } from '../interfaces/order/update-order-status.use-case.interface';

export class OrderController {
	constructor(
		private readonly createOrderUseCase: ICreateOrderUseCase,
		private readonly getOrderUseCase: IGetOrderUseCase,
		private readonly updateOrderStatusUseCase: IUpdateOrderStatusUseCase,
		private readonly updateOrderPaymentUseCase: IUpdateOrderPaymentUseCase
	) {}

	public async listProcessingOrders(): Promise<Order[]> {
		return this.getOrderUseCase.listProcessingOrders();
	}

	public async listAllOrders(): Promise<Order[]> {
		return this.getOrderUseCase.listAllOrders();
	}

	public async findById(id: number): Promise<Order> {
		return this.getOrderUseCase.findById(id);
	}

	public async create(body: CreateOrderBodyDto): Promise<Order> {
		return this.createOrderUseCase.create(body);
	}

	public async updateStatusProcessing(id: number): Promise<Order> {
		return this.updateOrderStatusUseCase.updateStatusProcessing(id);
	}

	public async updateStatusReady(id: number): Promise<Order> {
		return this.updateOrderStatusUseCase.updateStatusReady(id);
	}

	public async updateStatusFinished(id: number): Promise<Order> {
		return this.updateOrderStatusUseCase.updateStatusFinished(id);
	}

	public async updateStatusReceived(id: number): Promise<Order> {
		return this.updateOrderStatusUseCase.updateStatusReceived(id);
	}

	public async payment(webhookBody: any): Promise<void> {
		const { data } = webhookBody;
		const { id } = data;

		const paymentData = await mercadopago.payment.get(id);

		const { metadata, status } = paymentData.body
		const { order_id } = metadata;
		if (status === 'approved') await this.updateOrderPaymentUseCase.updateOrderPaymentStatusApproved(+order_id);

		if (status === 'rejected') await this.updateOrderPaymentUseCase.updateOrderPaymentStatusRefused(order_id);
	}
}
