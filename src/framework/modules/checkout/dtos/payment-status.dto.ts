import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ToInt } from 'src/framework/decorators/toint.decorator';

import { PaymentStatus } from '../../../../domain/value-objects/payment-status';

export default class PaymentStatusDto {
	@ApiProperty()
	@ToInt()
	id: number;

	@ApiProperty()
	@IsEnum(PaymentStatus)
	paymentStatus: PaymentStatus;
}
