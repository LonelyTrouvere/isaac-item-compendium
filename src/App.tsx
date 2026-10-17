import { useEffect, useState } from "react";
import "./App.css";
import FastScroll from "./components/FastScroll";
import UploadSaveFile from "./components/UploadSaveFile";
import MainApp from "./components/MainApp";
import type { ParsedData } from "./types/parsed-data";
import { db } from "./lib/db";
import type { Item } from "./types/item";
import itemsJson from "./items.json";

const items = [
  ...itemsJson.items.active,
  ...itemsJson.items.familiar,
  ...itemsJson.items.passive,
].sort((a, b) => {
  return a.id - b.id;
}) as Item[];

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);

  useEffect(() => {
    async function initDB() {
      const count = await db.items.count();
      if (count === 0) {
        await db.items.bulkAdd(items);
      }
    }

    initDB();

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
      {parsedData !== null ? (
        <MainApp parsedData={parsedData} />
      ) : (
        <UploadSaveFile setParsedData={setParsedData} />
      )}
      <footer className="app__footer"></footer>
      <FastScroll showScrollTop={showScrollTop} />
    </div>
  );
}

export default App;
