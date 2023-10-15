import { ChangeEvent, useState } from "react";
import { IDropdownInputOption } from "../components/input/DropdownInput";
import dayjs from "dayjs";

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

  const onQuillChange = (value: string, name: string) => {
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onInputTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prevData: any) => ({
      ...prevData,
      [e.target.name]: dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss"),
    }));
  };

  return {
    data,
    onInputChangeHandler,
    onDropdownInputChangeHandler,
    onQuillChange,
    onInputTimeChange,
  };
};

export default useInputChangeHandler;
