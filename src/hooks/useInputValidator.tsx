import { useState } from "react";

export interface IError {
  for: string;
  message: string;
}

interface IUseInputValidator {
  errors: Array<IError>;
  validateInputs: () => number;
  removeErrors: (name: string) => void;
}

export const useInputValidator = <T,>(body: T): IUseInputValidator => {
  const [errors, setErrors] = useState<IError[]>([]);

  const validateInputs = () => {
    let errorCount: number = 0;
    for (const key in body) {
      if (body[key] === "" || body[key] === undefined) {
        setErrors((prevErrors) => [
          ...prevErrors,
          {
            for: key,
            message: "This field is required",
          },
        ]);
        errorCount++;
      }
      if (key.toLowerCase().includes("email")) {
        if (
          !/[a-zA-Z0-9]{2,}@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}/.test(
            body[key] as string
          )
        ) {
          setErrors((prevErrors) => [
            ...prevErrors,
            {
              for: key,
              message: "Invalid email",
            },
          ]);
          errorCount++;
        }
      }
    }
    return errorCount;
  };

  const removeErrors = (name: string) => {
    setErrors((prevErrors) => prevErrors.filter((err) => err.for !== name));
  };

  return {
    errors,
    validateInputs,
    removeErrors,
  };
};
