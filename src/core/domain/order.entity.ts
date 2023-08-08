import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	OneToMany,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from '../value-objects/order-status';
import { ApiProperty } from '@nestjs/swagger';

@Entity('order')
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ApiProperty()
	status: OrderStatus;

	@Column()
	@ApiProperty()
	finishedAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => Client, (item) => item.orders)
	client: Client;

	@OneToMany(() => OrderItem, (item) => item.order, {
		cascade: true,
		persistence: true,
	})
	orderItems?: OrderItem[];
}
