/* v8 ignore start */
import { Inject, Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import env from '../../../config/env';
import { ICreateOrderUseCase } from '../../../domain/application/interfaces/order/create-order.use-case.interface';
import { CREATE_ORDER_USE_CASE } from '../../../domain/application/symbols/order.symbols';
import { CreateOrderDto } from '../../../domain/enterprise/dtos/create-order.dto';

@Injectable()
export class CreateOrderQueueGateway implements OnApplicationBootstrap, OnApplicationShutdown {

	private readonly consumer: Consumer;

	constructor(
		@Inject(CREATE_ORDER_USE_CASE)
		private readonly createOrderUseCase: ICreateOrderUseCase
	) {
		this.consumer = Consumer.create({
			queueUrl: env.QUEUE_CREATE_ORDER_URL ?? '',
			region: env.AWS_REGION,
			handleMessage: async (message) => {
				const dto = JSON.parse(message.Body) as CreateOrderDto;
				await this.createOrderUseCase.create(dto);
			}
		});
	}

	onApplicationBootstrap() {
		this.consumer.start();
	}

	onApplicationShutdown() {
		this.consumer.stop();
	}

}
/* v8 ignore stop */
