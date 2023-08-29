import { ClientController } from "../../controllers/client.controller";
import { ICreateClientUseCase } from "../../interfaces/client/create-client.use-case.interface";
import { IGetClientUseCase } from "../../interfaces/client/get-client.use-case.interface";

export const buildClientController = (
	getClientService: IGetClientUseCase,
	createClientService: ICreateClientUseCase,
): ClientController => {
	return new ClientController(
		getClientService,
		createClientService
	);
}