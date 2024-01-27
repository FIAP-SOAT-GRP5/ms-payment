/* v8 ignore start */
import { CreatedPaymentDto } from "@/domain/enterprise/dtos/created-payment.dto";
import { UpdatePaymentDto } from "@/domain/enterprise/dtos/update-order.dto";

export interface IUpdateOrderUseCase {
	updateStatusPayment(webhookBody: UpdatePaymentDto): Promise<void>;
}
/* v8 ignore stop */