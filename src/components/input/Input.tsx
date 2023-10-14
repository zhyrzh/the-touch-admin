import { FC, useRef } from "react";

interface IInput {
  label: string;
  type?: "text" | "datetime-local";
}

const Input: FC<IInput> = ({ label, type = "text" }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className="text-input"
      onClick={() => {
        if (type === "datetime-local" && inputRef.current) {
          inputRef.current.showPicker();
        }
      }}
    >
      <p className="text-input__label">{label}</p>
      <input className="text-input__input" type={type} ref={inputRef} />
    </div>
  );
};

export default Input;
