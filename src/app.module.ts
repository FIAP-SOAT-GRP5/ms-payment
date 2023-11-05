import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from './config/database';
import './config/mercadopago';
import { AuthModule } from './framework/modules/auth/auth.module';
import { CheckoutModule } from './framework/modules/checkout/checkout.module';
import { ClientModule } from './framework/modules/client/client.module';
import { ItemModule } from './framework/modules/item/item.module';
import { OrderModule } from './framework/modules/order/order.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...getDbConfig(),
		}),
		CheckoutModule,
		ClientModule,
		OrderModule,
		ItemModule,
		AuthModule,
		HttpModule,
	],
})
export class AppModule {}
