import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from './config/database';
import './config/mercadopago';
import { CheckoutModule } from './framework/modules/checkout/checkout.module';
import { ClientModule } from './framework/modules/client/client.module';
import { ItemModule } from './framework/modules/item/item.module';
import { NotificationModule } from './framework/modules/notification/notification.module';
import { OrderModule } from './framework/modules/order/order.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...getDbConfig(),
		}),
		NotificationModule,
		CheckoutModule,
		ClientModule,
		OrderModule,
		ItemModule,
		HttpModule,
	],
})
export class AppModule {}
