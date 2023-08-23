export class MercadoPagoServiceError extends Error {
	constructor() {
		super('Invalid parameters for payment.');
	}
}