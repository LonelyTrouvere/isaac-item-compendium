import Dexie, { type Table } from "dexie";
import type { Item } from "../types/item";
import type { GetItems } from "../types/get-items";

export class IsaacDatabase extends Dexie {
  items!: Table<Item, number>;

  constructor() {
    super("IsaacItemDatabase");
    this.version(2).stores({
      items: "id, name, type, quality, *tags, *pools",
    });
  }
}

export const db = new IsaacDatabase();

export async function getItems(params: GetItems) {
  const results = await db.items
    .offset(params.offset)
    .limit(params.limit)
    .toArray();

  return results;
}
