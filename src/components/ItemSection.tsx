import "./ItemSection.css";
import type { Item } from "../types/item";
import Pagination from "./Pagination";
import { Item as ItemComponent } from "./Item/Item";
import { useEffect, useState, useCallback } from "react";
import type { GetItems } from "../types/get-items";
import type { Filters } from "../types/filters";

export default function ItemSection({
  fetchItems,
  filters,
  noSpoilers,
}: {
  fetchItems: (params: GetItems) => Promise<Item[]>;
  filters: Filters;
  noSpoilers?: boolean;
}) {
  const LIMIT = 50;
  const [, setOffset] = useState(0);
  const [openItemId, setOpenItemId] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function initItems() {
      setOffset(0);
      setHasMore(true);
      const results = await fetchItems({
        limit: LIMIT,
        offset: 0,
        ...filters,
      });
      setItems(results);
    }

    initItems();
  }, [filters]);

  const handleFetch = useCallback(async () => {
    setOffset((prevOffset) => {
      const nextOffset = prevOffset + LIMIT;

      fetchItems({
        limit: LIMIT,
        offset: nextOffset,
        ...filters,
      }).then((result) => {
        setItems((prev) => [...prev, ...result]);
        setHasMore(result.length >= LIMIT);
      });

      return nextOffset;
    });
  }, [fetchItems, filters]);

  return (
    <div className="main__items-wrapper">
      <section className="main__items">
        {items.map((it) => (
          <ItemComponent
            item={it}
            key={`${it.type}_${it.id}`}
            openedItem={openItemId}
            setOpenItem={setOpenItemId}
            noSpoilers={noSpoilers}
          />
        ))}
      </section>
      {items.length > 0 && hasMore && <Pagination func={handleFetch} />}
    </div>
  );
}
