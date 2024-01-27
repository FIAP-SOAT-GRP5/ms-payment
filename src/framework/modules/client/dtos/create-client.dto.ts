import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateClientDto {
	@ApiProperty()
	document: string;

	@ApiPropertyOptional()
	name?: string;

	@ApiPropertyOptional()
	email?: string;

}