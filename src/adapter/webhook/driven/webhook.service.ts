import { Injectable } from '@nestjs/common';

import env from '../../../config/env';
import { IWebhookPort } from 'src/core/applications/ports/webhook.port';
import ngrok from 'src/config/ngrok';

@Injectable()
export class WebhookService implements IWebhookPort {
	constructor() {}
	async create(name: string): Promise<void> {
		const domain = await ngrok.tunnels.list()
        console.log(domain)
	}
}

