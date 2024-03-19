/* v8 ignore start */

import { Client } from "@/domain/enterprise/entities/client.entity";

export interface IUpdateClientToAnonymousUseCase {
	updateClient(id: string): Promise<Client>;
}
/* v8 ignore stop */