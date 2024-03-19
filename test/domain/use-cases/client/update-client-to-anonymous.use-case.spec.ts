import { CreateClientUseCase } from "@/domain/application/use-cases/client/create-client.use-case";
import { CreateClientDto } from "@/domain/enterprise/dtos/create-client.dto";
import { makeClient } from "test/factories/makeClient";
import { InMemoryClientRepository } from "../../../repositories/in-memory-client.repository";
import { UpdateClientToAnonymousUseCase } from "@/domain/application/use-cases/client/update-client-to-anonymous.use-case";

let inMemoryClientRepository: InMemoryClientRepository;
let sut: UpdateClientToAnonymousUseCase;

describe("UpdateClientToAnonymousUseCase", () => {

	beforeEach(() => {
		inMemoryClientRepository = new InMemoryClientRepository()
		sut = new UpdateClientToAnonymousUseCase(inMemoryClientRepository)
	})

	it("should be able to update client to anonymous", async () => {
		const client = makeClient()
		await inMemoryClientRepository.createClient(client)

		const response = await sut.updateClient(client._id);

		expect(response._id).toBeDefined()
		expect(response.document).toBe('12345678909')
		expect(response.email).toBe('')
		expect(response.name).toBe('')

		expect(inMemoryClientRepository.clients).toHaveLength(1)
	})
})