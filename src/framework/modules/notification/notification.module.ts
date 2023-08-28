import { Module } from '@nestjs/common';
import { FakeNotifyOrderRepository } from './driven/fake-notify-order.repository';

@Module({
	providers: [FakeNotifyOrderRepository],
	exports: [FakeNotifyOrderRepository],
})
export class NotificationModule {}
