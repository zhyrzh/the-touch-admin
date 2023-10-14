import { useState } from "react";

export default function useDragAndDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const [imageList, setImageList] = useState<File[]>([]);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    setImageList((prevList: any) => [...prevList, file]);
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImageList((prevList: any) => [...prevList, file]);
  };

  return {
    isDragging,
    imageList,
    setIsDragging,
    handleFileDrop,
    handleFileSelect,
  };
}
