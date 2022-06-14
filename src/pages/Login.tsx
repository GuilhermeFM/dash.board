import { FormEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import useAuth from "../hooks/auth";
import Input from "../components/Forms/Input";
import { getValidationsErrors } from "../helpers/validationErrors";

import logo from "../assets/DASH.BOARD.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [emailValidation, setEmailValidation] = useState<string | null>();
  const [passwordValidation, setPasswordValidation] = useState<string | null>();
  const [authenticateValidation, setAuthenticateValidation] = useState<string | null>();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setEmailValidation(null);
    setPasswordValidation(null);
    setAuthenticateValidation(null);

    const schema = Yup.object().shape({
      email: Yup.string().required("Required field").email("Invalid e-mail address."),
      password: Yup.string().required("Required field"),
    });

    const data: FormData = {
      email: emailRef.current?.value!,
      password: passwordRef.current?.value!,
    };

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const { email, password } = getValidationsErrors(err as Yup.ValidationError);

      setLoading(false);
      setEmailValidation(email);
      setPasswordValidation(password);
      return;
    }

    try {
      await auth.authenticate(data.email, data.password);
      navigate("/");
    } catch (err) {
      setAuthenticateValidation(err as string);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex h-screen w-screen justify-center overflow-auto bg-brand-800 p-5">
      <div className="my-auto flex min-w-[320px] flex-col items-center justify-center rounded border-[1px] border-zinc-100 bg-zinc-50 p-5 shadow md:p-10">
        <img src={logo} alt="DASH.BOARD" className="my-10" />

        <h1 className="my-5 w-full text-left text-xl text-brand-900 md:text-2xl">
          Sign In
        </h1>

        <form
          className="flex w-full flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            id="username"
            label="Username"
            placeholder="john@example.com"
            ref={emailRef}
            error={emailValidation}
            onChange={() => setEmailValidation(null)}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="password"
            ref={passwordRef}
            error={passwordValidation}
            onChange={() => setPasswordValidation(null)}
          />
          {authenticateValidation && (
            <p className="error my-5 w-full text-center">{authenticateValidation}</p>
          )}
          <button
            type="submit"
            className="btn-primary flex w-full items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                fontSize="24px"
                className="animate-spin"
              />
            ) : (
              <span>Sign In</span>
            )}
          </button>
          <div className="mt-5 w-full text-right font-medium">
            <a href="#" className="font-medium">
              Forgot password ?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
