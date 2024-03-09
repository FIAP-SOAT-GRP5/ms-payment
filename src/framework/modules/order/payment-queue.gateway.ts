/* v8 ignore start */
import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import env from '../../../config/env';
import { clientSQS } from '../../../config/sqs';
import { IPaymentQueueGateway } from '../../../domain/application/interfaces/order/payment-queue.gateway.interface';

@Injectable()
export class PaymentQueueGateway implements IPaymentQueueGateway {

	async sendApproved(orderId: number): Promise<void> {
		await clientSQS.send(new SendMessageCommand({
			QueueUrl: `${env.QUEUE_PAYMENT_APPROVED_URL ?? ''}_production`,
			MessageBody: JSON.stringify({ orderId }),
		}))
		await clientSQS.send(new SendMessageCommand({
			QueueUrl: `${env.QUEUE_PAYMENT_APPROVED_URL ?? ''}_order`,
			MessageBody: JSON.stringify({ orderId }),
		}))
	}

	async sendCANCELED(orderId: number): Promise<void> {
		await clientSQS.send(new SendMessageCommand({
			QueueUrl: `${env.QUEUE_PAYMENT_CANCELED_URL ?? ''}_production`,
			MessageBody: JSON.stringify({ orderId }),
		}))
		await clientSQS.send(new SendMessageCommand({
			QueueUrl: `${env.QUEUE_PAYMENT_CANCELED_URL ?? ''}_order`,
			MessageBody: JSON.stringify({ orderId }),
		}))
	}

}
/* v8 ignore stop */
