import { ChangeEvent, FC } from "react";
import { IError } from "../../utils";

export interface ITextInput {
  value: string;
  placeholder: string;
  name: string;
  type?: string;
  errors: Array<IError>;
  onInputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  removeErrors: (name: string) => void;
}

const TextInput: FC<ITextInput> = ({
  value,
  placeholder,
  name,
  type = "text",
  errors,
  onInputChangeHandler,
  removeErrors,
}) => {
  return (
    <div className="auth__input-container">
      <input
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (errors.findIndex((err) => err.for === name) > -1) {
            removeErrors(name);
          }
          onInputChangeHandler(event);
        }}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value ? value : ""}
        className="auth__input"
        autoComplete="off"
        style={
          errors.findIndex((err) => err.for === name) > -1
            ? { border: "1px solid red" }
            : undefined
        }
      />
      {errors.findIndex((err) => err.for === name) > -1 ? (
        <p
          className="auth__condition-text"
          style={{ marginTop: "2px", color: "red" }}
        >
          {errors[errors.findIndex((err) => err.for === name)].message}
        </p>
      ) : null}
    </div>
  );
};

export default TextInput;
