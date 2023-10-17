import {
  useRef,
  FC,
  ChangeEventHandler,
  DragEventHandler,
  useState,
} from "react";
import useDragAndDrop from "./useDragNdrop";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";
import Backdrop from "../../UI/Backdrop";
import { cloudinary } from "../../../configs/cloudinary";

const FileInputv2: FC<{
  onUploadImage: ChangeEventHandler;
  onUploadDraggedImage: DragEventHandler;
  imageList: any[];
}> = ({ onUploadImage, onUploadDraggedImage, imageList }) => {
  const [selectedImg, setSelectedImg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDragging, setIsDragging } = useDragAndDrop();

  return (
    <div className="drag-and-drop">
      {selectedImg && <Backdrop url={selectedImg} />}
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
        onDrop={(e) => {
          onUploadDraggedImage(e);
          setIsDragging(false);
        }}
      >
        <div>
          <p style={{ textAlign: "center" }}>
            Drag and drop a file here <br />
            or
          </p>
          <input
            type="file"
            onChange={onUploadImage}
            ref={fileInputRef}
            accept="image/*"
          />
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
        <ul className="">
          {imageList.map((img) => {
            const resizedImg = cloudinary
              .image(img.publicId)
              .namedTransformation(name("for-list"));

            return (
              <li key={img.id}>
                <img src={resizedImg.toURL()} alt="" />
                <p style={{ marginLeft: "20px" }}>{img.filename}</p>
                {/* to be replaced with icon */}
                <p
                  className="drag-and-drop__list-item-action-button"
                  onClick={() => setSelectedImg(img.url)}
                >
                  View
                </p>
                {/* to be replaced with icon */}
                <p className="drag-and-drop__list-item-action-button">Delete</p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default FileInputv2;
