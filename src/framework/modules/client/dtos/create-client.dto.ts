import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export default class CreateClientDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	document?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional()
	@IsEmail()
	@IsOptional()
	email?: string;
}
