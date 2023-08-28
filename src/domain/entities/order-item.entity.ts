import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('order_has_item')
export class OrderItem {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ApiProperty()
	price: number;

	@Column()
	@ApiProperty()
	quantity: number;

	@ManyToOne(() => Item, (item) => item.orderItems)
	@JoinColumn({ name: 'item_id' })
	item: Item;

	@ManyToOne(() => Order, (item) => item.orderItems)
	@JoinColumn({ name: 'order_id' })
	order: Order;
}
