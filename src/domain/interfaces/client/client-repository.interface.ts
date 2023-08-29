import { Client } from "../../entities/client.entity";
import { IRepository } from "../repository.interface";

export interface IClientRepository extends IRepository<Client> {
}