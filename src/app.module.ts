import { Module } from '@nestjs/common';
import { CheckoutModule } from './framework/modules/checkout/checkout.module';
import { ClientModule } from './framework/modules/client/client.module';
import { OrderModule } from './framework/modules/order/order.module';

@Module({
	imports: [OrderModule, ClientModule, CheckoutModule],
})
export class AppModule {}
