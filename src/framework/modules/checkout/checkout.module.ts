import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CheckoutGateway } from './driven/checkout.gateway';

@Module({
	providers: [
		CheckoutGateway,
	],
	exports: [CheckoutGateway],
	imports: [HttpModule],
})

export class CheckoutModule {}
