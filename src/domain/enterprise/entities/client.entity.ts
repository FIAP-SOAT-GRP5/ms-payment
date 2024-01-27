import { IEntity } from '../../application/interfaces/entity.interface';
import { Order } from './order.entity';

export class Client implements IEntity {
	_id: string;
	email?: string;
	document?: string;
	name?: string;
	orders?: Order[];

	getId(): string {
		return this._id;
	}
}
