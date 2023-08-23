import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WebhookService } from './driven/webhook.service';

@Module({
	providers: [WebhookService],
	exports: [WebhookService],
	imports: [HttpModule],
})

export class WebhookModule {}
