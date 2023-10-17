import { useState, useEffect, useContext } from "react";
import { UserContext } from "../stores/user";

const useGenerateDropdownOptions = (optionKey: string) => {
  const userContext = useContext(UserContext);
  const [options, setOptions] = useState<
    {
      name: string;
      key: string;
    }[]
  >([]);

  const fetchOptions = async () => {
    const data = await userContext.getAllByRole(optionKey);
    setOptions(data);
  };

  useEffect(() => {
    fetchOptions();
  }, [optionKey]);

  return [options];
};

export default useGenerateDropdownOptions;
