import { UpdatePaymentDto } from "@/domain/enterprise/dtos/update-order.dto";
import { Order } from "../../../enterprise/entities/order.entity";
import { IGetOrderUseCase } from "../../interfaces/order/get-order.use-case.interface";
import { IOrderRepository } from "../../interfaces/order/order-repository.interface";
import { IUpdateOrderUseCase } from "../../interfaces/order/update-order.use-case.interface";
import { IPaymentOrderUseCase } from "../../interfaces/order/payment-order.use-case.interface";

export class UpdateOrderUseCase implements IUpdateOrderUseCase {
	constructor(
		private readonly repository: IOrderRepository,
		private readonly payment: IPaymentOrderUseCase
	) {}
	async updateStatusPayment(webhookBody: UpdatePaymentDto): Promise<void> {
		const { data } = webhookBody;
		const { id } = data;
		const paymentData = await this.payment.getPayment(+id);
		const { order_id, status } = paymentData;
		if (status === 'approved') await this.repository.updateOrderStatusPaymentApproved(+order_id);
		if (status === 'rejected') await this.repository.updateOrderStatusPaymentRefused(+order_id);
	}
	
}
