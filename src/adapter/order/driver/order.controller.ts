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
import { IGetOrderService } from '../../../core/applications/interfaces/get-order.service.interface';
import { ApiTags } from '@nestjs/swagger';
import { CREATE_ORDER_SERVICE, GET_ORDER_SERVICE, LIST_PROCESSING_ORDER_SERVICE, UPDATE_ORDER_STATUS_SERVICE } from '../order.symbols';
import { IListProcessingOrdersService } from '../../../core/applications/interfaces/list-processing-orders.service.interface';
import { Response } from 'express';
import { ICreateOrderService } from '../../../core/applications/interfaces/create-order.service.interface';
import { CreateOrderBodyDto } from '../dtos/create-order.dto';
import { OrderWithoutItemsError } from '../../../core/errors/order-without-items.error';
import { IUpdateOrderStatusService } from '../../../core/applications/interfaces/update-order-status.service.interface';
import { OrderNotFoundError } from '../../../core/errors/order-not-found.error';
import { InvalidOrderStatusError } from '../../../core/errors/invalid-order-status.error';

@Controller('order')
@ApiTags('Order')
export class OrderController {
	constructor(
		@Inject(CREATE_ORDER_SERVICE) private readonly createOrderService: ICreateOrderService,
		@Inject(GET_ORDER_SERVICE) private readonly getOrderService: IGetOrderService,
		@Inject(LIST_PROCESSING_ORDER_SERVICE)
		private readonly listProcessingOrdersService: IListProcessingOrdersService,
		@Inject(UPDATE_ORDER_STATUS_SERVICE) private readonly updateOrderStatusService: IUpdateOrderStatusService,
	) {}

	@Get('list-processing-orders')
	public async listProcessingOrders(@Res() res: Response): Promise<void> {
		try {
			const list = await this.listProcessingOrdersService.listProcessingOrders();
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
			const order = await this.getOrderService.findById(id);
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
	public async create(@Res() res: Response, @Body() body: CreateOrderBodyDto): Promise<void> {
		try {
			const order = await this.createOrderService.create(body);
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
	public async updateStatusProcessing(@Res() res: Response, @Param('id', ParseIntPipe) id: number): Promise<void> {
		try {
			const order = await this.updateOrderStatusService.updateStatusProcessing(id);
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
	public async updateStatusReady(@Res() res: Response, @Param('id', ParseIntPipe) id: number): Promise<void> {
		try {
			const order = await this.updateOrderStatusService.updateStatusReady(id);
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
	public async updateStatusFinished(@Res() res: Response, @Param('id', ParseIntPipe) id: number): Promise<void> {
		try {
			const order = await this.updateOrderStatusService.updateStatusFinished(id);
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
}
