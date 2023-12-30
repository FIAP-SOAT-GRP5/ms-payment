import { Item } from "../../src/domain/entities/item.entity"

export function makeItem() {
	const item = new Item()
	item.name = "Bebida"
	item.price = 5.00
	return item
}
