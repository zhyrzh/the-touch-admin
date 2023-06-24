import { ChangeEvent, useState } from "react";

const useInputChangeHandler = <T,>() => {
  const [data, setData] = useState<T>();

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prevData: any) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    data,
    onInputChangeHandler,
  };
};

export default useInputChangeHandler;
