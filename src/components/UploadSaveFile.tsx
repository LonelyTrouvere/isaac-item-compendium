import { useRef, useState } from "react";

export default function UploadSaveFile() {
    const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
        }}
      >
        <div className="main__upload-area__upload-icon">
          <img src="/public/upload.svg" height={30} width={30} />
        </div>
        <p className="main__upload-area__text">
          Drag and drop or choose from device .dat file with The Binding of
          Isaac game data
        </p>
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
        />
      </div>
    </main>
  );
}
