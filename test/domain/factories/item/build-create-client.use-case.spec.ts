import { buildCreateClientUseCase } from "@/domain/application/factories/client/create-client.use-case.factory";
import { InMemoryClientRepository } from "../../../repositories/in-memory-client.repository";

let inMemoryClientRepository: InMemoryClientRepository;

describe("buildCreateClientUseCase", () => {

	beforeEach(() => {
		inMemoryClientRepository = new InMemoryClientRepository()
	})

	it("should create a class", async () => {
		const useCase = buildCreateClientUseCase(inMemoryClientRepository)

		expect(useCase).toBeDefined()
	})
})