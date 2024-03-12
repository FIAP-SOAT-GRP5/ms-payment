import { buildUpdateClientToAnonymousUseCase } from "@/domain/application/factories/client/update-client-to-anonymous.use-case.factory";
import { InMemoryClientRepository } from "../../../repositories/in-memory-client.repository";
import { UpdateClientToAnonymousUseCase } from "@/domain/application/use-cases/client/update-client-to-anonymous.use-case";

let inMemoryClientRepository: InMemoryClientRepository;
let updateClientToAnonymousUseCase: UpdateClientToAnonymousUseCase;

describe("buildUpdateClientToAnonymousUseCase", () => {

	beforeEach(() => {
		inMemoryClientRepository = new InMemoryClientRepository()
		updateClientToAnonymousUseCase = new UpdateClientToAnonymousUseCase(inMemoryClientRepository)
	})

	it("should create a class", async () => {
		const useCase = buildUpdateClientToAnonymousUseCase(inMemoryClientRepository)
		expect(useCase).toBeDefined()
	})
})