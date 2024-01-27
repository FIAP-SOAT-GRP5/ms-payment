import { IEntity } from '../../application/interfaces/entity.interface';
import { OrderStatusPayment } from '../value-objects/order-status-payment';

export class Order implements IEntity {
	_id: string;
	orderOrigin_id: number;
	status_payment: OrderStatusPayment;
	payment_url: string;

	getId(): string {
		return this._id;
	}
}
