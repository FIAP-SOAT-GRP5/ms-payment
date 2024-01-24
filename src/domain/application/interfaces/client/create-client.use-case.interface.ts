/* v8 ignore start */
import { CreateClientDto } from "../../../enterprise/dtos/create-client.dto";
import { Client } from "../../../enterprise/entities/client.entity";

export interface ICreateClientUseCase {
	createClient(client: CreateClientDto): Promise<Client>;
}
/* v8 ignore stop */