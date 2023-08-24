import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import PaymentStatusDto from '../dtos/payment-status.dto';

import { UPDATE_PAYMENT_STATUS } from '../checkout.symbols';
import { OrderNotFoundError } from 'src/core/errors/order-not-found.error';
import { InvalidOrderStatusError } from 'src/core/errors/invalid-order-status.error';
import { IUpdateOrderStatusAndPaymentStatusService } from 'src/core/applications/interfaces/update-order-status-payment-status.service.interface';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
	constructor(
		@Inject(UPDATE_PAYMENT_STATUS)
		private readonly paymentStatusService: IUpdateOrderStatusAndPaymentStatusService
	) {}

	@Post()
	public async payment(
		@Res() res: Response,
		@Body() paymentStatusDto: PaymentStatusDto
	) {
		try {
			await this.paymentStatusService.updateOrderStatusAndPaymentStatus(
				paymentStatusDto
			);
			res.status(200);
		} catch (error) {
			if (error instanceof OrderNotFoundError) {
				res.status(404).send(error.message);
			} else if (error instanceof InvalidOrderStatusError) {
				res.status(409).send(error.message);
			} else {
				res.status(500).send(error.message);
			}
		}
	}
}
