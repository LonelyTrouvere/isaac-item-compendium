import { useEffect, useState } from "react";
import "./App.css";
import FiltersTab from "./components/FiltersTab";
import Item from "./components/Item/Item";
import itemsJson from "./items.json";
import type { Item as ItemType } from "./types/item";
import FastScroll from "./components/FastScroll";

const items = [
  ...itemsJson.items.active,
  ...itemsJson.items.familiar,
  ...itemsJson.items.trinket,
  ...itemsJson.items.passive,
].sort(() => 0.5 - Math.random()) as ItemType[];

function App() {
  const [openItemId, setOpenItemId] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);

   useEffect(() => {
     const updateScrollTop = () => setShowScrollTop(window.scrollY > 480);
     updateScrollTop();
     window.addEventListener("scroll", updateScrollTop, { passive: true });
     return () => window.removeEventListener("scroll", updateScrollTop);
   }, []);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__header__main">THE BINDING OF ISAAC</h1>
        <h3 className="app__header__sub">Item Compendium</h3>
      </header>
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
              <Item
                item={it}
                key={`${it.type}_${it.id}`}
                openedItem={openItemId}
                setOpenItem={setOpenItemId}
              />
            ))}
          </section>
        </div>
      </main>
      <footer className="app__footer"></footer>
      <FastScroll showScrollTop={showScrollTop}/>
    </div>
  );
}

export default App;
