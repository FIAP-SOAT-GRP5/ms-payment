import { Module } from '@nestjs/common';
import { MercadoPagoExternal } from './mercado-pago.external';

@Module({
	providers: [MercadoPagoExternal],
	exports: [MercadoPagoExternal],
})
export class CheckoutModule {}
