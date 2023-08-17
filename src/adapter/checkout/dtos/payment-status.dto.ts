import { ToInt } from 'src/adapter/decorators/toint.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { PaymentStatus } from '../../../core/value-objects/payment-status';

export default class PaymentStatusDto {
	@ApiProperty()
	@ToInt()
	id: number;

	@ApiProperty()
	@IsEnum(PaymentStatus)
	paymentStatus: PaymentStatus;
}
