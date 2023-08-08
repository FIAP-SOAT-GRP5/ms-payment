import { Module } from '@nestjs/common';
import { FakeCheckoutService } from './driven/fake-checkout.service';

@Module({
	providers: [FakeCheckoutService],
	exports: [FakeCheckoutService],
})
export class CheckoutModule {}
