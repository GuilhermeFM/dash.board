import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import * as Yup from "yup";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { Input } from "../components/Forms/Input";
import { Button } from "../components/Forms/Button";
import { ErrorBox } from "../components/Forms/ErrorBox";

import { useFetch } from "../hooks/fetch";
import { useValidade } from "../hooks/validade";

interface FormData {
  email: string;
}

const recoverPasswordFormValidation = Yup.object().shape({
  email: Yup.string()
    .required("E-mail is required")
    .email("E-mail is not a valid address"),
});

export function RecoverPassword() {
  const formRef = useRef<FormHandles>(null);
  const { validations, validate } = useValidade();
  const { error, fetching, executeGet } = useFetch();

  const handleOnSubmit = useCallback(async (data: FormData) => {
    const valid = await validate(recoverPasswordFormValidation, data);

    if (!valid) {
      return;
    }

    await executeGet("sign-in", data);
  }, []);

  useEffect(() => {
    formRef.current?.setErrors(validations ?? {});
  }, [validations]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="w-full text-left text-xl">Passsword Recovery</h1>

      <span className="h-1 w-10 self-start rounded-full bg-brand-900"></span>

      <p className="w-full text-left text-zinc-400">
        <span>
          Lost your password ? No problem just tell us your e-mail and we will send you a
          link to create a new one. If you don't have a account yet
        </span>
        <Link
          to="/sign-up"
          className="ml-1 text-brand-400 transition-colors duration-300 hover:text-brand-900"
        >
          sign up here.
        </Link>
      </p>

      {(validations || error) && <ErrorBox errors={{ ...validations, ...error }} />}

      <Form
        ref={formRef}
        className="flex w-full flex-col gap-3"
        onSubmit={handleOnSubmit}
      >
        <Input name="email" placeholder="Email address" disabled={fetching} />
        <Button text="Reset password" disabled={fetching} loading={fetching} />
      </Form>
    </div>
  );
}
