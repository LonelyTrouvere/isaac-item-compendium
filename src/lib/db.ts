import Dexie, { type Table } from "dexie";
import type { Item } from "../types/item";

// 2. Extend the Dexie class and declare your tables
export class IsaacDatabase extends Dexie {
  items!: Table<Item, number>;

  constructor() {
    super("IsaacItemDatabase");
    this.version(1).stores({
      items: "id, name, type, quality, *tags, *pools",
    });
  }
}

// 3. Export a singleton instance
export const db = new IsaacDatabase();
