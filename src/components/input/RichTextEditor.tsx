import { FC } from "react";
import ReactQuill from "react-quill";

interface IRichTextEditor {
  value: string;
  onChange: (value: string, name: string) => void;
}

const RichTextEditor: FC<IRichTextEditor> = ({ value, onChange }) => {
  return (
    <div className="text-input">
      <p className="text-input__label">Body</p>
      <ReactQuill
        value={value}
        onChange={(value: string) => {
          onChange(value, "body");
        }}
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
        ]}
        style={{
          borderRadius: "10px",
          minHeight: "150px",
          marginTop: "7px",
        }}
      />
    </div>
  );
};

export default RichTextEditor;
