import { useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { Input } from "../components/Forms/Input";
import { Button } from "../components/Forms/Button";
import { ErrorBox } from "../components/Forms/ErrorBox";

import { useAuth } from "../hooks/auth";
import { useFetch } from "../hooks/fetch";
import { useValidade } from "../hooks/validade";
import { IUser } from "../api/interfaces/IUser";

interface FormData {
  username: string;
  password: string;
}

const signInFormValidation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const { validations, validate } = useValidade();
  const { data, error, fetching, executeGet } = useFetch<IUser>();

  const { addUser } = useAuth();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(async (data: FormData) => {
    const required = await validate(signInFormValidation, data);

    if (!required) {
      return;
    }

    await executeGet("sign-in", data);
  }, []);

  useEffect(() => {
    if (!validations) {
      return;
    }

    formRef.current?.setErrors(validations);
  }, [validations]);

  useEffect(() => {
    if (!data) {
      return;
    }

    addUser(data);
    navigate("/");
  }, [data]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="w-full text-left text-xl">Sign In</h1>

      <span className="h-1 w-10 self-start rounded-full bg-brand-900"></span>

      <p className="w-full text-left text-zinc-400">
        <span>Already have a account ? Enter your account info bellow to login.</span>
      </p>

      {(validations || error) && <ErrorBox errors={{ ...validations, ...error }} />}

      <Form
        ref={formRef}
        className="flex w-full flex-col gap-3"
        onSubmit={handleOnSubmit}
      >
        <Input name="username" placeholder="Username" disabled={fetching} />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          disabled={fetching}
        />

        <p className="w-full text-right text-zinc-400">
          <Link
            to="/recover-password"
            className="ml-1 text-brand-400 transition-colors duration-300 hover:text-brand-900"
          >
            Recover password ?
          </Link>
        </p>

        <Button text="Sign In" disabled={fetching} loading={fetching} />
      </Form>

      <p className="w-full text-center text-zinc-400">
        <span>Don't have a account ?</span>
        <Link
          to="/sign-up"
          className="ml-1 text-brand-400 transition-colors duration-300 hover:text-brand-900"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
