export interface INotifyOrderPort {
	emitOrderIsProcessing(id: number): void;
	emitOrderIsReady(id: number): void;
}