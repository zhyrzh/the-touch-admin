import React, { useState } from "react";

const useDropdownChangeHandler = () => {
  const [selectedValue, setSelectedValue] = useState<any>([] as any[]);
  return {
    selectedValue,
  };
};

export default useDropdownChangeHandler;
