import { FC } from "react";
import { createPortal } from "react-dom";

const ImageOverlay: FC<{ url: string }> = ({ url }) => {
  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: "0",
        backgroundColor: "rgba(0, 0, 0, .6)",
        zIndex: "10",
      }}
    >
      <img src={url} alt="" />
    </div>,
    document.getElementById("overlay-root")!
  );
};

export default ImageOverlay;
