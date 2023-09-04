import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OrderController } from '../../../domain/controllers/order.controller';
import { InvalidOrderStatusError } from '../../../domain/errors/invalid-order-status.error';
import { OrderNotFoundError } from '../../../domain/errors/order-not-found.error';
import { OrderWithoutItemsError } from '../../../domain/errors/order-without-items.error';
import {
	ORDER_CONTROLLER
} from '../../../domain/symbols/order.symbols';
import { CreateOrderBodyDto } from './dtos/create-order.dto';
import { PaymentWebhookDto } from './dtos/payment-webhook.dto';

@Controller('order')
@ApiTags('Order')
export class OrderApi {
	constructor(
		@Inject(ORDER_CONTROLLER)
		private readonly orderController: OrderController,
	) {}

	@Get('list-processing-orders')
	public async listProcessingOrders(@Res() res: Response): Promise<void> {
		try {
			const list = await this.orderController.listProcessingOrders();
			if (!list) {
				res.status(404).send('Orders not found');
			} else {
				res.status(200).send({ list });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Get('list-all-orders')
	public async listAllOrders(@Res() res: Response): Promise<void> {
		try {
			const list = await this.orderController.listAllOrders();
			if (!list) {
				res.status(404).send('Orders not found');
			} else {
				res.status(200).send({ list });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Get(':id')
	public async findById(
		@Res() res: Response,
		@Param('id', ParseIntPipe) id: number
	): Promise<void> {
		try {
			const order = await this.orderController.findById(id);
			if (!order) {
				res.status(404).send('Orders not found');
			} else {
				res.status(200).send({ order });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Post()
	public async create(
		@Res() res: Response,
		@Body() body: CreateOrderBodyDto
	): Promise<void> {
		try {
			const order = await this.orderController.create(body);
			res.status(201).send({ order });
		} catch (error) {
			if (error instanceof OrderWithoutItemsError) {
				res.status(400).send(error.message);
			} else {
				res.status(500).send(error.message);
			}
		}
	}

	@Put(':id/status/processing')
	public async updateStatusProcessing(
		@Res() res: Response,
		@Param('id', ParseIntPipe) id: number
	): Promise<void> {
		try {
			const order = await this.orderController.updateStatusProcessing(id);
			res.status(200).send({ order });
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

	@Put(':id/status/ready')
	public async updateStatusReady(
		@Res() res: Response,
		@Param('id', ParseIntPipe) id: number
	): Promise<void> {
		try {
			const order = await this.orderController.updateStatusReady(id);
			res.status(200).send({ order });
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

	@Put(':id/status/finished')
	public async updateStatusFinished(
		@Res() res: Response,
		@Param('id', ParseIntPipe) id: number
	): Promise<void> {
		try {
			const order = await this.orderController.updateStatusFinished(id);
			res.status(200).send({ order });
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

	@Put(':id/status/received')
	public async updateStatusReceived(
		@Res() res: Response,
		@Param('id', ParseIntPipe) id: number
	): Promise<void> {
		try {
			const order = await this.orderController.updateStatusReceived(id);
			res.status(200).send({ order });
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

	@Post('status/payment')
	public async payment(
		@Res() res: Response,
		@Body() webhookBody: PaymentWebhookDto
	) {
		try {
			await this.orderController.payment(webhookBody);
			res.status(200).send();
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
