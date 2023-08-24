
import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Res,
	Put,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Client } from '../../../core/domain/client.entity';
import { IClientRepositoryPort } from '../../../core/applications/ports/client-repository.port';
import { PaymentStatus } from 'src/core/value-objects/payment-status';
import { IGetOrderService } from 'src/core/applications/interfaces/get-order.service.interface';
import { ApiTags } from '@nestjs/swagger';
import { UPDATE_ORDER_PAYMENT_STATUS_SERVICE } from 'src/adapter/order/order.symbols';
import { OrderNotFoundError } from 'src/core/errors/order-not-found.error';
import { InvalidOrderStatusError } from 'src/core/errors/invalid-order-status.error';
import { Response } from 'express';
import { IUpdateOrderStatusAndPaymentStatusService } from 'src/core/applications/interfaces/update-order-status-payment-status.service.interface';

@ApiTags('Webhook')
@Controller('webhook')
export class WebhookController {
	constructor(
		@Inject(UPDATE_ORDER_PAYMENT_STATUS_SERVICE)
		private readonly updateOrderStatusPaymentService: IUpdateOrderStatusAndPaymentStatusService,
	) {}
	
	@Post('webhook')
	public async createPaymentStatus(
		@Res() res: Response,
		@Body() paymentStatusDto: any,
	): Promise<void> {
		console.log(paymentStatusDto);
		
	}
}
