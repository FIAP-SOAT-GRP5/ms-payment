import { IGetItemService } from "../../../core/applications/interfaces/Item/get-item.service.interface";
import { ICreateOrderService } from "../../../core/applications/interfaces/create-order.service.interface";
import { ICheckoutPort } from "../../../core/applications/ports/checkout.port";
import { IOrderRepositoryPort } from "../../../core/applications/ports/order-repository.port";
import { CreateOrderService } from "../../../core/applications/services/create-order.service";

export const buildCreateOrderService = (repository: IOrderRepositoryPort, getItemService: IGetItemService, checkout: ICheckoutPort): ICreateOrderService => {
	return new CreateOrderService(repository, getItemService, checkout);
}