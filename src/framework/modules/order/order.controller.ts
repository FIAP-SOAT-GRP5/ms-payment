import { IUpdateOrderUseCase } from '@/domain/application/interfaces/order/update-order.use-case.interface';
import {
	Body,
	Controller,
	Inject,
	Post,
	Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
	UPDATE_ORDER_USE_CASE
} from '../../../domain/application/symbols/order.symbols';
import { PaymentWebhookDto } from './dtos/payment-webhook.dto';

@Controller('order')
@ApiTags('Order')
export class OrderController {
	constructor(
		@Inject(UPDATE_ORDER_USE_CASE)
		private readonly updateOrderUseCase: IUpdateOrderUseCase,
	) {}

	@Post('status/payment')
	public async payment(
		@Res() res: Response,
		@Body() webhookBody: PaymentWebhookDto
	) {
		try {
			await this.updateOrderUseCase.updateStatusPayment(webhookBody);
			res.status(200).send();
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}
