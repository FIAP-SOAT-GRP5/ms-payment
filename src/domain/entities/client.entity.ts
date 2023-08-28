import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('client')
export class Client {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ApiProperty()
	email?: string;

	@Column()
	@ApiProperty()
	document?: string;

	@Column()
	@ApiProperty()
	name?: string;

	@OneToMany(() => Order, (item) => item.client)
	orders?: Order[];
}
