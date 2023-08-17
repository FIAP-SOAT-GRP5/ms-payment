import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { FakeCheckoutService } from '../../core/applications/services/fake-checkout.service';
import { PaymentController } from './driver/fake-checkout.controller';

import { UPDATE_PAYMENT_STATUS } from './checkout.symbols';

import { CheckoutRepository } from './driven/checkout.repository';

import { buildUpdateOrderStatusAndPaymentStatus } from '../order/factories/update-order-status-payment-status.service.factory';

@Module({
	providers: [
		FakeCheckoutService,
		{
			provide: UPDATE_PAYMENT_STATUS,
			inject: [CheckoutRepository],
			useFactory: buildUpdateOrderStatusAndPaymentStatus,
		},
	],
	exports: [FakeCheckoutService],
	controllers: [PaymentController],
	imports: [HttpModule],
})
export class CheckoutModule {}
