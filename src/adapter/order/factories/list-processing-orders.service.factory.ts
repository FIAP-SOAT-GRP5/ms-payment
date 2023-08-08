import { IListProcessingOrdersService } from "../../../core/applications/interfaces/list-processing-orders.service.interface";
import { IOrderRepositoryPort } from "../../../core/applications/ports/order-repository.port";
import { ListProcessingOrdersService } from "../../../core/applications/services/list-processing-orders.service";

export const buildListProcessingOrdersService = (repository: IOrderRepositoryPort): IListProcessingOrdersService => {
	return new ListProcessingOrdersService(repository);
}