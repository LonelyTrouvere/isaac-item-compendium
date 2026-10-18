import type { Item } from "../types/item";
import Pagination from "./Pagination";
import { Item as ItemComponent } from "./Item/Item";
import { useEffect, useState, useCallback } from "react";
import type { GetItems } from "../types/get-items";

export default function ItemSection({
  fetchItems,
  noSpoilers,
}: {
  fetchItems: (params: GetItems) => Promise<Item[]>;
  noSpoilers?: boolean;
}) {
  const LIMIT = 50;
  const [, setOffset] = useState(0);
  const [openItemId, setOpenItemId] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function initItems() {
      const results = await fetchItems({
        limit: LIMIT,
        offset: 0,
      });
      console.log(results)
      setItems(results);
    }

    initItems();
  }, []);

  const handleFetch = useCallback(async () => {
    setOffset((prevOffset) => {
      const nextOffset = prevOffset + LIMIT;

      fetchItems({
        limit: LIMIT,
        offset: nextOffset,
      }).then((result) => {
        setItems((prev) => [...prev, ...result]);
        setHasMore(result.length >= LIMIT);
      });

      return nextOffset;
    });
  }, [fetchItems]);

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
