import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import './config/mercadopago';
import { getMongoConfig } from './config/mongo';
import { CheckoutModule } from './framework/modules/checkout/checkout.module';
import { ClientModule } from './framework/modules/client/client.module';
import { OrderModule } from './framework/modules/order/order.module';

@Module({
	imports: [
		MongooseModule.forRoot(getMongoConfig()),
		OrderModule,
		ClientModule,
		CheckoutModule
	],
})
export class AppModule {}
