import { GetClientUseCase } from "@/domain/application/use-cases/client/get-client.use-case";
import { buildGetClientUseCase } from "../../../../src/domain/application/factories/client/get-client.use-case.factory";
import { InMemoryClientRepository } from "../../../repositories/in-memory-client.repository";

let inMemoryClientRepository: InMemoryClientRepository;
let getClientUseCase: GetClientUseCase;

describe("buildGetClientUseCase", () => {

	beforeEach(() => {
		inMemoryClientRepository = new InMemoryClientRepository()
		getClientUseCase = new GetClientUseCase(inMemoryClientRepository)
	})

	it("should get a class", async () => {
		const useCase = buildGetClientUseCase(inMemoryClientRepository)
		expect(useCase).toBeDefined()
	})
})