export interface IWebhookPort {
	create(name: string): Promise<void>;
}
