export interface IError {
  for: string;
  message: string;
}

export const validateInputs = <T>(body: T): Array<IError> => {
  let errors: Array<IError> = [];
  for (const key in body) {
    if (body[key] === "" || body[key] === undefined) {
      errors.push({
        for: key,
        message: "This field is required",
      });
    }
    if (key.toLowerCase().includes("email")) {
      if (
        !/[a-zA-Z0-9]{2,}@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}/.test(
          body[key] as string
        )
      ) {
        errors.push({
          for: key,
          message: "Invalid email",
        });
      }
    }
  }
  return errors;
};
