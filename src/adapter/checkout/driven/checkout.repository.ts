import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from 'src/core/domain/order.entity';

import { ICheckoutPort } from 'src/core/applications/ports/checkout.port';

import { OrderToCreateDto } from 'src/core/dtos/order-to-create.dto';
import PaymentStatusDto from '../dtos/payment-status.dto';

import { PaymentStatus } from 'src/core/value-objects/payment-status';
import { OrderStatus } from 'src/core/value-objects/order-status';

@Injectable()
export class CheckoutRepository implements ICheckoutPort {
	constructor(
		@InjectRepository(Order)
		private orderRepository: Repository<Order>
	) {}
	async updateOrderStatusAndPaymentStatus({
		id,
		paymentStatus,
	}: PaymentStatusDto): Promise<boolean> {
		const exists = this.orderRepository.exist({
			where: {
				id,
			},
		});
		if (!exists) return false;

		await this.orderRepository.update(id, {
			status_payment: paymentStatus,
			status:
				paymentStatus === PaymentStatus.APPROVED
					? OrderStatus.RECEIVED
					: OrderStatus.CANCELED,
		});
		return true;
	}

	doPayment(id: number, dataOrder: OrderToCreateDto): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
