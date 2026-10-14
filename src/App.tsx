import { useEffect, useState } from "react";
import "./App.css";
import FastScroll from "./components/FastScroll";
import UploadSaveFile from "./components/UploadSaveFile";

function App() {
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
      <UploadSaveFile />
      <footer className="app__footer"></footer>
      <FastScroll showScrollTop={showScrollTop} />
    </div>
  );
}

export default App;
