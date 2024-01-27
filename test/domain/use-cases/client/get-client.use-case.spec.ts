import { GetClientUseCase } from "@/domain/application/use-cases/client/get-client.use-case";
import { makeClient } from "../../../factories/makeClient";
import { InMemoryClientRepository } from "../../../repositories/in-memory-client.repository";

let inMemoryClientRepository: InMemoryClientRepository;
let sut: GetClientUseCase;

describe("GetClientUseCase", () => {

	beforeEach(() => {
		inMemoryClientRepository = new InMemoryClientRepository()
		sut = new GetClientUseCase(inMemoryClientRepository)
	})

	it("should be able to find client by document", async () => {
		const client = makeClient()
		await inMemoryClientRepository.createClient(client)

		const response = await sut.getClientByDocument(client.document);
		expect(response.document).toBeDefined()
	})

	it("should be able to find all clients", async () => {
		const client = makeClient()
		await inMemoryClientRepository.createClient(client)

		const response = await sut.findAll();

		expect(response).toHaveLength(1)
	})

})