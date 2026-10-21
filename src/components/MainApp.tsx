import "./MainPanel.css";
import "./MainApp.css";
import { useEffect, useState, type ChangeEvent } from "react";
import FiltersTab from "./FiltersTab";
import type { ParsedData } from "../types/parsed-data";
import type { CollectiblesChunkType } from "../lib/collectibles-chunk-type";
import { db, getItems } from "../lib/db";
import ItemSection from "./ItemSection";
import type { Filters } from "../types/filters";

export default function MainApp({ parsedData }: { parsedData: ParsedData }) {
  const [itemCount, setItemCount] = useState(0);
  const [noSpoilers, setNoSpoilers] = useState<boolean>(
    localStorage.getItem("noSpoilers") !== "0",
  );
  const [filters, setFilters] = useState<Filters>({});

  const collected = (
    parsedData.chunks[3].body as unknown as CollectiblesChunkType
  ).seen_by_id;

  useEffect(() => {
    async function initDB() {
      const count = await db.items.count();
      setItemCount(count);
    }

    initDB();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value });
  };

  return (
    <main className="main">
      <section className="main__header">
        <div>
          <p className="main__header__main">Collectibles</p>
          <p className="main__header__sub">
            {collected.reduce((col, prev) => col + prev, 0)} out of {itemCount}{" "}
            discovered
          </p>
        </div>
        <div className="main__actions">
          <div className="toggle-wrapper">
            <span>No spoilers</span>
            <label className="toggle">
              <input
                className="toggle__input"
                type="checkbox"
                id="btnToggle"
                name="btnToggle"
                checked={noSpoilers}
                onChange={() => {
                  setNoSpoilers((sp) => {
                    localStorage.setItem("noSpoilers", sp ? "0" : "1");
                    return !sp;
                  });
                }}
              />
              <span className="toggle__slider"></span>
            </label>
          </div>
          <label className="main__search">
            <button className="main__search__button">
              <img
                src={`${import.meta.env.BASE_URL}/search.svg`}
                width={17}
                height={17}
              />
            </button>
            <input
              className="main__search__input"
              placeholder="Search items..."
              onChange={handleSearch}
            />
          </label>
        </div>
      </section>
      <div className="main__content-wrapper">
        <FiltersTab setFilters={setFilters} />
        <ItemSection
          fetchItems={getItems}
          filters={filters}
          noSpoilers={noSpoilers}
        />
      </div>
    </main>
  );
}
