import { CreateClientUseCase } from "@/domain/application/use-cases/client/create-client.use-case";
import { buildCreateClientUseCase } from "../../../../src/domain/application/factories/client/create-client.use-case.factory";
import { InMemoryClientRepository } from "../../../repositories/in-memory-client.repository";

let inMemoryClientRepository: InMemoryClientRepository;
let createClientUseCase: CreateClientUseCase;

describe("buildCreateClientUseCase", () => {

	beforeEach(() => {
		inMemoryClientRepository = new InMemoryClientRepository()
		createClientUseCase = new CreateClientUseCase(inMemoryClientRepository)
	})

	it("should create a class", async () => {
		const useCase = buildCreateClientUseCase(inMemoryClientRepository)
		expect(useCase).toBeDefined()
	})
})