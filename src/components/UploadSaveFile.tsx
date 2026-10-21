import { useRef, useState } from "react";
import { Buffer } from "buffer";
import type { ParsedData } from "../types/parsed-data";
import { parseIsaacSaveFile } from "../lib/isaac-save-parser";
import type { CollectiblesChunkType } from "../lib/collectibles-chunk-type";

export default function UploadSaveFile({
  procesData: setParsedData,
}: {
  procesData: (data: ParsedData) => unknown;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const selectFile = async (incoming?: File) => {
    if (!incoming) return;

    if (!incoming.name.toLowerCase().endsWith(".dat")) {
      setError("Only .dat files can be analyzed.");
      return;
    }

    setError("");
    try {
      const fileBuffer = await incoming.arrayBuffer();
      const parsedData = parseIsaacSaveFile(Buffer.from(fileBuffer));
      // Exclude alternate Book of Belial and Damocles entries from the discovery count.
      const collected = (
        parsedData.chunks[3].body as unknown as CollectiblesChunkType
      ).seen_by_id;
      collected[59] = 0;
      collected[656] = 0;
      await setParsedData(parsedData);
    } catch {
      setError("Could not read this save file. Please choose a valid Isaac .dat file.");
    }
  };

  return (
    <main className="main upload-main">
      <div
        className={`main__upload-area ${isDragging ? "dragging" : ""}`}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setIsDragging(false);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          void selectFile(event.dataTransfer.files[0]);
        }}
      >
        <div className="main__upload-area__upload-icon">
          <img
            src={`${import.meta.env.BASE_URL}/upload.svg`}
            height={30}
            width={30}
          />
        </div>
        <p className="main__upload-area__text">
          Drag and drop or choose from device .dat file with The Binding of
          Isaac game data
        </p>
        {error && <p role="alert">{error}</p>}
        <button
          type="button"
          className="main__upload-area__button"
          onClick={() => inputRef.current?.click()}
        >
          Choose .dat file
        </button>
        <input
          className="main__upload-area__input"
          ref={inputRef}
          type="file"
          accept=".dat,application/octet-stream"
          onChange={(event) => {
            selectFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </div>
    </main>
  );
}
