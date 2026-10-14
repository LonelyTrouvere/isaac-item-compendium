import { useState } from "react";
import type { Item } from "../types/item";
import FiltersTab from "./FiltersTab";
import itemsJson from "../items.json";
import { Item as ItemComponent } from "./Item/Item";

const items = [
  ...itemsJson.items.active,
  ...itemsJson.items.familiar,
  ...itemsJson.items.trinket,
  ...itemsJson.items.passive,
].sort(() => 0.5 - Math.random()) as Item[];

export default function MainApp() {
  const [openItemId, setOpenItemId] = useState<string>("");

  return (
    <main className="main">
      <section className="main__header">
        <div>
          <p className="main__header__main">Collectibles</p>
          <p className="main__header__sub">
            0 out of {items.length} discovered
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
          {items.map((it) => (
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
