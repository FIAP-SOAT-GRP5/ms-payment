import CreateClientDto from "../../dtos/create-client.dto";
import { Client } from "../../entities/client.entity";

export interface ICreateClientUseCase {
	createClient({ document, email, name }: CreateClientDto): Promise<Client>;
}