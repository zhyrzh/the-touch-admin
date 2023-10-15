import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../stores/user";

const useGenerateDropdownOptions = (optionKey: string) => {
  const authContext = useContext(AuthContext);
  const [options, setOptions] = useState<
    {
      name: string;
      key: string;
    }[]
  >([]);

  const fetchOptions = async () => {
    const data = await authContext.getAllByRole(optionKey);
    setOptions(data);
  };

  useEffect(() => {
    fetchOptions();
  }, [optionKey]);

  return [options];
};

export default useGenerateDropdownOptions;
