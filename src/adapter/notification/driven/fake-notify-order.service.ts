import { Injectable } from '@nestjs/common';
import { INotifyOrderPort } from '../../../core/applications/ports/notify-order.port';

@Injectable()
export class FakeNotifyOrderService implements INotifyOrderPort {
	constructor() {
	}
	emitOrderIsProcessing(id: number): void {
		console.log(`Order ${id} is processing`);
	}
	emitOrderIsReady(id: number): void {
		console.log(`Order ${id} is ready`);
	}

}
