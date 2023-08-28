import { Injectable } from '@nestjs/common';
import { INotifyOrderGateway } from '../../../../domain/interfaces/order/notify-order.gateway.interface';

@Injectable()
export class FakeNotifyOrderRepository implements INotifyOrderGateway {
	constructor() {
	}
	emitOrderIsProcessing(id: number): void {
		console.log(`Order ${id} is processing`);
	}
	emitOrderIsReady(id: number): void {
		console.log(`Order ${id} is ready`);
	}

}
