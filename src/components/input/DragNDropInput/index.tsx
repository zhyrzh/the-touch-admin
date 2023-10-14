import { useRef } from "react";
import useDragAndDrop from "./useDragNdrop";

const FileInputv2 = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isDragging,
    imageList,
    handleFileDrop,
    setIsDragging,
    handleFileSelect,
  } = useDragAndDrop();

  return (
    <div className="drag-and-drop">
      <div
        className={
          !isDragging
            ? "drag-container"
            : "drag-container drag-container--dragged"
        }
        onDragOver={(e: any) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDrop={handleFileDrop}
      >
        <div>
          <p style={{ textAlign: "center" }}>
            Drag and drop a file here <br />
            or
          </p>
          <input type="file" onChange={handleFileSelect} ref={fileInputRef} />
          <button
            className="drag-container__button"
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click();
            }}
          >
            Select File
          </button>
        </div>
      </div>
      {imageList.length >= 1 ? (
        <ul>
          {imageList.map((img) => (
            <li key={img.name}>{img.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default FileInputv2;
