import { OrderStatus } from "@/domain/enterprise/value-objects/order-status";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { ToInt } from '../../../decorators/toint.decorator';

class ClientDto {
	@ApiProperty()
	@ToInt()
	id: number;
}

class ItemDto {
	@ApiProperty()
	@ToInt()
	id: number;
	@ApiProperty()
	name: string;
}

class OrderItemsDto {
	@ApiProperty()
	@ToInt()
	price: number;
	@ApiProperty()
	@ToInt()
	quantity: number;
	@ApiProperty({ type: ItemDto, nullable: false })
	item: ItemDto;
}

export class CreateOrderBodyDto {
	@ApiProperty()
	@ToInt()
	id: number;
	@ApiProperty({ nullable: false })
	status: OrderStatus;
	@ApiProperty({ type: ClientDto, nullable: false })	
	client: ClientDto;
	@ApiProperty({ type: OrderItemsDto, isArray: true, nullable: false })
	@IsArray()
	orderItems: OrderItemsDto[];
}
