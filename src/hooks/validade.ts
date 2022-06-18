import { useCallback, useState } from "react";
import { ObjectShape } from "yup/lib/object";
import * as Yup from "yup";

import { IError } from "../api/interfaces/IError";

function getValidationsErrors(error: Yup.ValidationError): IError {
  const validationErrors: IError = {};

  error.inner.forEach((err) => {
    validationErrors[err.path!] = err.message;
  });

  return validationErrors;
}

export function useValidade() {
  const [validations, setValidations] = useState<IError | null>(null);

  const validate = useCallback(
    async (schema: Yup.ObjectSchema<ObjectShape>, data: object): Promise<boolean> => {
      setValidations(null);

      let errors;

      try {
        await schema.validate(data, { abortEarly: false });
      } catch (err) {
        errors = getValidationsErrors(err as Yup.ValidationError);
      }

      errors && setValidations(errors);

      return !errors;
    },
    []
  );

  return { validations, validate };
}
