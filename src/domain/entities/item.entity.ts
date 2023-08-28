import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { OrderItem } from './order-item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('item')
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ApiProperty()
	name: string;

	@Column()
	@ApiProperty()
	price: number;

	@Column()
	@ApiProperty()
	description?: string;

	@Column({ name: 'category_id' })
	@ApiProperty()
	category_id: number;

	@ManyToOne(() => Category)
	@JoinColumn({ name: 'category_id' })
	category: Category;

	@OneToMany(() => OrderItem, (item) => item.item)
	orderItems?: OrderItem[];
}
