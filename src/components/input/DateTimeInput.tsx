import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

interface IInput {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeInput: FC<IInput> = ({ label, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [realTimeValue, setRealTimeValue] = useState(dayjs());

  useEffect(() => {
    if (!value) {
      const interval = setInterval(() => {
        dayjs().add(1, "second").format("YYYY-MM-DD HH:mm:ss");
        setRealTimeValue((prevTime) => prevTime.add(1, "second"));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [value]);

  const getValue = (): string => {
    if (value !== "") {
      return value;
    } else {
      return realTimeValue.format("YYYY-MM-DD HH:mm:ss").toString();
    }
  };

  return (
    <>
      <div
        className="text-input"
        onClick={() => {
          if (inputRef.current) inputRef.current.showPicker();
        }}
      >
        <p className="text-input__label">{label}</p>
        <input
          className="text-input__input"
          type="datetime-local"
          ref={inputRef}
          value={getValue()}
          onChange={onChange}
          placeholder={realTimeValue.format("YYYY-MM-DD HH:mm:ss").toString()}
          name="createdAt"
        />
      </div>
    </>
  );
};

export default DateTimeInput;
