import { Client } from "../../domain/client.entity";

export interface IGetClientService {
	findByDocument(document: string): Promise<Client>;
}