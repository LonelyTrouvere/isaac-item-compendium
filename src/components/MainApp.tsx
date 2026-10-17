import { useCallback, useEffect, useRef, useState } from "react";
import FiltersTab from "./FiltersTab";

import type { ParsedData } from "../types/parsed-data";
import type { CollectiblesChunkType } from "../lib/collectibles-chunk-type";
import { getItems } from "../lib/db";
import type { Item } from "../types/item";
import Pagination from "./Pagination";
import ItemSection from "./ItemSection";

export default function MainApp({ parsedData }: { parsedData: ParsedData }) {
  return (
    <main className="main">
      {/* <section className="main__header">
        <div>
          <p className="main__header__main">Collectibles</p>
          <p className="main__header__sub">
            {collected.reduce((col, prev) => col + prev, 0)} out of{" "}
            {items.length} discovered
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
      </section> */}
      <div className="main__content-wrapper">
        <FiltersTab />
        <ItemSection fetchItems={getItems} />
      </div>
    </main>
  );
}
