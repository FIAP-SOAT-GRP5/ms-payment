import { Module } from '@nestjs/common';
import { FakeNotifyOrderService } from './driven/fake-notify-order.service';

@Module({
	providers: [FakeNotifyOrderService],
	exports: [FakeNotifyOrderService],
})
export class NotificationModule {}
