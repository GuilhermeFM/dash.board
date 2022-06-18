import { HTMLProps, useEffect, useRef } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useField } from "@unform/core";

export function Input({
  name,
  className,
  disabled,
  ...rest
}: HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, error, registerField, clearError } = useField(name!);

  useEffect(() => {
    registerField({
      ref: ref,
      name: fieldName,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <div
      className={`relative flex items-center rounded-md border bg-white focus-within:shadow-md hover:shadow-md ${
        error
          ? "border-red-400"
          : !disabled &&
            `border-slate-100 transition-colors duration-300 focus-within:border-brand-300 hover:border-brand-300`
      }`}
    >
      <input
        ref={ref}
        name={name}
        value={defaultValue}
        disabled={disabled}
        className="w-full rounded-md p-3"
        onChange={() => clearError()}
        {...rest}
      />
      <FontAwesomeIcon
        icon={faX}
        className={`absolute right-5 text-xs md:text-sm ${
          error ? "text-red-400" : "invisible"
        }`}
      />
    </div>
  );
}
