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
  const { offset, limit, ...filters } = params;

  const res = await db.items
    .filter((item) => {
      if (filters.quality?.length && !filters.quality.includes(item.quality ?? '-1')) {
        return false;
      }

      if (filters.type?.length && !filters.type.includes(item.type)) {
        return false;
      }

      if (
        filters.discovered?.length &&
        !filters.discovered.includes(item.discovered ? '1' : '0')
      ) {
        return false;
      }

      if (
        filters.name?.trim() &&
        !item.name.toLowerCase().includes(filters.name.trim().toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .offset(offset)
    .limit(limit)
    .toArray();

    return res;
}