import { ApiProperty } from "@nestjs/swagger";

class DataDto {
	@ApiProperty()
	id: string;
}

export class PaymentWebhookDto {
	@ApiProperty()
	data: DataDto;
}