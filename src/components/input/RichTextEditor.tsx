import { FC } from "react";
import ReactQuill from "react-quill";
import { IError } from "../../utils";

interface IRichTextEditor {
  value: string;
  placeHolder: string;
  errors: Array<IError>;
  onChange: (value: string, name: string) => void;
}

const RichTextEditor: FC<IRichTextEditor> = ({
  value,
  placeHolder,
  errors,
  onChange,
}) => {
  return (
    <div className="text-input">
      <p className="text-input__label">{placeHolder}</p>
      <ReactQuill
        value={value}
        onChange={(value: string) => {
          onChange(value, "content");
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
          border:
            errors.findIndex((err) => err.for === "content") > -1
              ? "1px solid red"
              : "",
        }}
      />
      {errors && errors.findIndex((err) => err.for === "content") > -1 ? (
        <p className="dropdown__error-text">
          {errors[errors.findIndex((err) => err.for === "content")].message}
        </p>
      ) : null}
    </div>
  );
};

export default RichTextEditor;
