import { FakeNotifyOrderGateway } from "../../gateways/order/fake-notify-order.gateway";
import { INotifyOrderGateway } from "../../interfaces/order/notify-order.gateway.interface";

export const buildNotifyOrderGateway = (): INotifyOrderGateway => {
	return new FakeNotifyOrderGateway();
}