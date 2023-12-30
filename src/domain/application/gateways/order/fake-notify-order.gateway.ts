import { INotifyOrderGateway } from '../../interfaces/order/notify-order.gateway.interface';

export class FakeNotifyOrderGateway implements INotifyOrderGateway {
	constructor() {
	}
	emitOrderIsProcessing(id: number): void {
		console.log(`Order ${id} is processing`);
	}
	emitOrderIsReady(id: number): void {
		console.log(`Order ${id} is ready`);
	}

}
