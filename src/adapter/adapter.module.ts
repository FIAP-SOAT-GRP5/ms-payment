import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ItemModule } from './item/item.module';
import { ClientModule } from './client/client.module';
import { NotificationModule } from './notification/notification.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
	imports: [NotificationModule, CheckoutModule, OrderModule, ItemModule, ClientModule],
})
export class AdapterModule {}
