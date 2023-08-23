import { Module } from '@nestjs/common';

import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { ClientModule } from './client/client.module';
import { CheckoutModule } from './checkout/checkout.module';
import { WebhookModule } from './webhook/webhook.module';

import { NotificationModule } from './notification/notification.module';

@Module({
	imports: [
		NotificationModule,
		CheckoutModule,
		ClientModule,
		OrderModule,
		ItemModule,
		WebhookModule,
	],
})
export class AdapterModule {}
