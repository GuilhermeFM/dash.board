import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}

export function getValidationsErrors(error: ValidationError): Errors {
  const validationErrors: Errors = {};

  error.inner.forEach((err) => {
    validationErrors[err.path!] = err.message;
  });

  return validationErrors;
}
