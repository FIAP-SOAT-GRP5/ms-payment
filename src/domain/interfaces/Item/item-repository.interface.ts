import { Item } from "../../entities/item.entity";
import { IRepository } from "../repository.interface";

export interface IItemRepository extends IRepository<Item> {
}