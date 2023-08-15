import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { FakeCheckoutService } from './driven/fake-checkout.service';

@Module({
	providers: [FakeCheckoutService],
	exports: [FakeCheckoutService],
	imports: [HttpModule],
})
export class CheckoutModule {}
