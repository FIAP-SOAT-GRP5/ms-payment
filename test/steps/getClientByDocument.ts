import { Before, Given, Then, When, } from '@cucumber/cucumber';
import { strictEqual } from "assert";
import { GetClientUseCase } from "../../src/domain/application/use-cases/client/get-client.use-case";
import { Client } from '../../src/domain/enterprise/entities/client.entity';
import { makeClient } from "../factories/makeClient";
import { InMemoryClientRepository } from "../repositories/in-memory-client.repository";

let inMemoryClientRepository: InMemoryClientRepository;
let sut: GetClientUseCase;
let createdClient: Client;
let client;

Before(() => {
	inMemoryClientRepository = new InMemoryClientRepository()
	sut = new GetClientUseCase(inMemoryClientRepository)
})

Given('I have a registered client', async () => {
	const clientToCreate = makeClient()
	createdClient = await inMemoryClientRepository.createClient(clientToCreate)
})

When('I inform the client document', async () => {
	client = await sut.getClientByDocument(createdClient.document);
	return client;
})

Then('the client is returned', async () => {
	strictEqual(client._id, createdClient._id);
})

Given(`I have some registered client`, async () => {
	const clientToCreate = makeClient()
	createdClient = await inMemoryClientRepository.createClient(clientToCreate)
});

When(`I inform the wrong client document`, async () => {
	client = await sut.getClientByDocument('25874');
	return client;
});

Then(`the client is not returned`, () => {
	strictEqual(client, undefined);
});
