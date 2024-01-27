import { IEntity } from '../../application/interfaces/entity.interface';
import { OrderStatusPayment } from '../value-objects/order-status-payment';

export class Order implements IEntity {
	id: number;
	status_payment: OrderStatusPayment;
	
	getId(): number {
		return this.id;
	}
}
