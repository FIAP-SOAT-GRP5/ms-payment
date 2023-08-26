import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CheckoutService } from './driven/checkout.service';

@Module({
	providers: [
		CheckoutService, 
	],
	exports: [CheckoutService],
	imports: [HttpModule],
})

export class CheckoutModule {}
