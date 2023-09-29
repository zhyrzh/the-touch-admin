import { ChangeEvent, useState } from "react";
import { IDropdownInputOption } from "../components/input/DropdownInput";

const useInputChangeHandler = <T,>() => {
  const [data, setData] = useState<T>();

  const onInputChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prevData: any) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const onDropdownInputChangeHandler = (
    option: IDropdownInputOption,
    inputName: string
  ) => {
    setData((prevData: any) => ({
      ...prevData,
      [inputName]: option.name,
    }));
  };

  return {
    data,
    onInputChangeHandler,
    onDropdownInputChangeHandler,
  };
};

export default useInputChangeHandler;
