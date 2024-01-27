import { Client } from "../../src/domain/enterprise/entities/client.entity"

export function makeClient() {
	const client = new Client()
	client.document = "12345678909"
	client.name = "Nome"
	client.email = "Email"
	return client
}
