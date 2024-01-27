import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig, getMongoConfig } from './config/database';
import { AuthModule } from './framework/modules/auth/auth.module';
import { OrderModule } from './framework/modules/order/order.module';
import { ClientModule } from './framework/modules/client/client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckoutModule } from './framework/modules/checkout/checkout.module';
import './config/mercadopago';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...getDbConfig(),
		}),
		MongooseModule.forRoot(getMongoConfig()),
		OrderModule,
		AuthModule,
		ClientModule,
		CheckoutModule
	],
})
export class AppModule {}
