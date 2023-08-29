import { ClientGateway } from "../../gateways/client/client.gateway";
import { IClientRepository } from "../../interfaces/client/client-repository.interface";
import { IClientGateway } from "../../interfaces/client/client.gateway.interface";

export const buildClientGateway = (
	clientRepository: IClientRepository
): IClientGateway => {
	return new ClientGateway(clientRepository);
}