import { useEffect, useState } from "react";
import FiltersTab from "./FiltersTab";
import { Item as ItemComponent } from "./Item/Item";
import type { ParsedData } from "../types/parsed-data";
import type { CollectiblesChunkType } from "../lib/collectibles-chunk-type";
import { db } from "../lib/db";
import type { Item } from "../types/item";

export default function MainApp({ parsedData }: { parsedData: ParsedData }) {
  const [openItemId, setOpenItemId] = useState<string>("");
  const collected = (
    parsedData.chunks[3].body as unknown as CollectiblesChunkType
  ).seen_by_id;

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function initItems() {
      const results = await db.items.limit(50).toArray();
      setItems(results);
    }

    initItems();
  }, []);

  return (
    <main className="main">
      <section className="main__header">
        <div>
          <p className="main__header__main">Collectibles</p>
          <p className="main__header__sub">
            {collected.reduce((col, prev) => col+prev, 0)} out of {items.length} discovered
          </p>
        </div>
        <label className="main__search">
          <button className="main__search__button">
            <img src="/public/search.svg" width={17} height={17} />
          </button>
          <input
            className="main__search__input"
            placeholder="Search items..."
          />
        </label>
      </section>
      <div className="main__content-wrapper">
        <FiltersTab />
        <section className="main__items">
          {items
            .filter((it) => collected[it.id])
            .map((it) => (
              <ItemComponent
                item={it}
                key={`${it.type}_${it.id}`}
                openedItem={openItemId}
                setOpenItem={setOpenItemId}
              />
            ))}
        </section>
      </div>
    </main>
  );
}
