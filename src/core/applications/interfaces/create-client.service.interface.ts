import { Client } from "../../domain/client.entity";
import CreateClientDto from "src/adapter/client/dtos/create-client.dto";

export interface ICreateClientService {
	createClient({ document, email, name }: CreateClientDto): Promise<Client>;
}