import { FC, useRef, ChangeEventHandler } from "react";
import { IError } from "../../utils";
interface IInput {
  name: string;
  label: string;
  value: string;
  errors: Array<IError>;
  isPassword?: boolean;
  onInputChangeHandler: ChangeEventHandler;
  removeErrors: (name: string) => void;
}

const Input: FC<IInput> = ({
  label,
  name,
  errors,
  value,
  isPassword = false,
  onInputChangeHandler,
  removeErrors,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (errors.findIndex((err) => err.for === name) > -1) {
      removeErrors(name);
    }
    onInputChangeHandler(event);
  };

  const onCheckErrors = (): React.CSSProperties | undefined => {
    if (errors) {
      return errors?.findIndex((err) => err.for === name) > -1
        ? { border: "1px solid red" }
        : undefined;
    }
  };

  return (
    <div className="text-input">
      <p className="text-input__label">{label}</p>
      <input
        type={!isPassword ? "text" : "password"}
        className="text-input__input"
        onChange={onChangeHandler}
        value={value}
        name={name}
        ref={inputRef}
        style={onCheckErrors()}
      />
      {errors && errors.findIndex((err) => err.for === name) > -1 ? (
        <p className="text-input__error-text">
          {errors[errors.findIndex((err) => err.for === name)].message}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
