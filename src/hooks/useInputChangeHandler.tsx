import { ChangeEvent, useState } from "react";
import { IDropdownInputOption } from "../components/input/DropdownInput";
import dayjs from "dayjs";

const useInputChangeHandler = <T,>(definedData: T) => {
  const [data, setData] = useState<T>(definedData);

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
      [inputName]: option.label,
    }));
  };

  const onMultiDropdownInputChangeHandler = (
    option: IDropdownInputOption,
    inputName: string
  ) => {
    if (
      (data[inputName as keyof typeof data] as Array<any>)?.findIndex(
        (o: IDropdownInputOption) => o.key === option.key
      ) >= 0
    ) {
      setData((prevData: any) => ({
        ...prevData,
        [inputName]: prevData[inputName]?.filter(
          (o: IDropdownInputOption) => o.key !== option.key
        ),
      }));
    } else {
      setData((prevData: any) => ({
        ...prevData,
        [inputName]: [...prevData[inputName], option],
      }));
    }
  };

  const onRemoveOption = (option: IDropdownInputOption, inputName: string) => {
    setData((prevData: any) => ({
      ...prevData,
      [inputName]: prevData[inputName].filter(
        (o: IDropdownInputOption) => o.key !== option.key
      ),
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
      [e.target.name]: dayjs(e.target.value)
        .format("YYYY-MM-DD HH:mm:ss")
        .toString(),
    }));
  };

  return {
    data,
    onInputChangeHandler,
    onDropdownInputChangeHandler,
    onMultiDropdownInputChangeHandler,
    onQuillChange,
    onInputTimeChange,
    onRemoveOption,
  };
};

export default useInputChangeHandler;
