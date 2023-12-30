export interface INotifyOrderGateway {
	emitOrderIsProcessing(id: number): void;
	emitOrderIsReady(id: number): void;
}