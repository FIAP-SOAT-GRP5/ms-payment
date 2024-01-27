import { CreateClientUseCase } from "@/domain/application/use-cases/client/create-client.use-case";
import { CreateClientDto } from "@/domain/enterprise/dtos/create-client.dto";
import { makeClient } from "test/factories/makeClient";
import { InMemoryClientRepository } from "../../../repositories/in-memory-client.repository";

let inMemoryClientRepository: InMemoryClientRepository;
let sut: CreateClientUseCase;

describe("CreateClientUseCase", () => {

	beforeEach(() => {
		inMemoryClientRepository = new InMemoryClientRepository()
		sut = new CreateClientUseCase(inMemoryClientRepository)
	})

	it("should be able to create a client", async () => {
		const client = makeClient()

		const dto = new CreateClientDto();
		dto.document = client.document
		dto.name = client.name
		dto.email = client.email

		const response = await sut.createClient(dto);

		expect(response.id).toBeDefined()
		expect(inMemoryClientRepository.clients).toHaveLength(1)
	})
})