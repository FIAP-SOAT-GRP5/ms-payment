/* v8 ignore start */
export interface IPaymentQueueGateway {
	sendApproved(orderId: number): Promise<void>;
	sendCANCELED(orderId: number): Promise<void>;
}
/* v8 ignore stop */