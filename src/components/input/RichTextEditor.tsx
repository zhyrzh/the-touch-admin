import { FC } from "react";
import ReactQuill from "react-quill";
import { IError } from "../../utils";

interface IRichTextEditor {
  defaultValue?: string;
  value?: string;
  placeHolder: string;
  errors: Array<IError>;
  onChange: (value: string, name: string) => void;
  onKeyPressed?: () => void;
}

const RichTextEditor: FC<IRichTextEditor> = ({
  value,
  defaultValue,
  placeHolder,
  errors,
  onChange,
  onKeyPressed,
}) => {
  return (
    <div className="text-input">
      {/* {console.log(defaultValue, "check default value")} */}
      <p className="text-input__label">{placeHolder}</p>
      <ReactQuill
        defaultValue={defaultValue}
        value={value === "" ? defaultValue : value}
        onChange={(
          _changeVal: string,
          _delta: any,
          _source: any,
          editor: any
        ) => {
          // console.log(editor.getHTML());
          onChange(editor.getHTML(), "content");
        }}
        onKeyPress={() => onKeyPressed && onKeyPressed()}
        onKeyDown={() => onKeyPressed && onKeyPressed()}
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
