import { useEffect, useState } from "react";
import "./App.css";
import FastScroll from "./components/FastScroll";
import UploadSaveFile from "./components/UploadSaveFile";
import MainApp from "./components/MainApp";
import type { ParsedData } from "./types/parsed-data";
import { db } from "./lib/db";
import type { Item } from "./types/item";
import itemsJson from "./items.json";
import type { CollectiblesChunkType } from "./lib/collectibles-chunk-type";

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

      const nosSpoilers = localStorage.getItem("noSpoilers");
      if (nosSpoilers === undefined || nosSpoilers === null) {
        localStorage.setItem("noSpoilers", "1");
      }
    }

    initDB();

    const updateScrollTop = () => setShowScrollTop(window.scrollY > 480);
    updateScrollTop();
    window.addEventListener("scroll", updateScrollTop, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollTop);
  }, []);

  async function handleFileUpload(parsedData: ParsedData) {
    setParsedData(parsedData);
    try {
      const collected = (
        parsedData.chunks[3].body as unknown as CollectiblesChunkType
      ).seen_by_id;
      const updates = collected.map((state, index) => ({
        key: index + 1,
        changes: {
          discovered: state === 1,
        },
      }));

      await db.items.bulkUpdate(updates);
    } catch (error) {
      console.error("Failed to update items from file:", error);
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__header__main">THE BINDING OF ISAAC</h1>
        <h3 className="app__header__sub">Item Compendium</h3>
      </header>
      {parsedData !== null ? (
        <MainApp parsedData={parsedData} />
      ) : (
        <UploadSaveFile procesData={handleFileUpload} />
      )}
      <footer className="app__footer"></footer>
      <FastScroll showScrollTop={showScrollTop} />
    </div>
  );
}

export default App;
