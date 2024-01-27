import { buildGetClientUseCase } from "../../../../src/domain/application/factories/Client/get-Client.use-case.factory";
import { InMemoryClientRepository } from "../../../repositories/in-memory-client.repository";

let inMemoryClientRepository: InMemoryClientRepository;

describe("buildGetClientUseCase", () => {

	beforeEach(() => {
		inMemoryClientRepository = new InMemoryClientRepository()
	})

	it("should create a class", async () => {
		const useCase = buildGetClientUseCase(inMemoryClientRepository)

		expect(useCase).toBeDefined()
	})
})