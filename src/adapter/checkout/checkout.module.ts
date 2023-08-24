import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CheckoutService } from './driven/checkout.service';
import { PaymentController } from './driver/checkout.controller';

@Module({
	providers: [CheckoutService],
	exports: [CheckoutService],
	imports: [HttpModule],
	controllers: [PaymentController],
})

export class CheckoutModule {}
