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
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

const signUpFormValidation = Yup.object().shape({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .required("E-mail is required")
    .email("E-mail is not a valid address"),
  password: Yup.string().min(6, "Password must be 6 characters long"),
  passwordConfirmation: Yup.string()
    .required("You need to confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export function SignUp() {
  const formRef = useRef<FormHandles>(null);
  const { validations, validate } = useValidade();
  const { error, fetching, executeGet } = useFetch();

  const handleOnSubmit = useCallback(async (data: FormData) => {
    const required = await validate(signUpFormValidation, data);

    if (!required) {
      return;
    }

    await executeGet("sign-in", data);
  }, []);

  useEffect(() => {
    formRef.current?.setErrors(validations ?? {});
  }, [validations]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="w-full text-left text-xl">Sign Up</h1>

      <span className="h-1 w-10 self-start rounded-full bg-brand-900"></span>

      <p className="w-full text-left text-zinc-400">
        <span>
          Don't have a account? It takes less than a minute to create one. If you already
          have a account
        </span>
        <Link
          to="/sign-in"
          className="ml-1 text-brand-400 transition-colors duration-300 hover:text-brand-900"
        >
          Sign in.
        </Link>
      </p>

      {(validations || error) && <ErrorBox errors={{ ...validations, ...error }} />}

      <Form
        ref={formRef}
        className="flex w-full flex-col gap-3"
        onSubmit={handleOnSubmit}
      >
        <Input
          name="firstname"
          placeholder="Firstname"
          disabled={fetching}
          autoComplete="new-password"
        />
        <Input
          name="lastname"
          placeholder="Lastname"
          disabled={fetching}
          autoComplete="new-password"
        />
        <Input
          name="username"
          placeholder="Username"
          disabled={fetching}
          autoComplete="new-password"
        />
        <Input
          name="email"
          placeholder="Email address"
          disabled={fetching}
          autoComplete="new-password"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          disabled={fetching}
          autoComplete="new-password"
        />
        <Input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm your password"
          disabled={fetching}
          autoComplete="new-password"
        />

        <Button text="Sign Up" disabled={fetching} loading={fetching} />
      </Form>
    </div>
  );
}
