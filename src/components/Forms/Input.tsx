import { forwardRef, InputHTMLAttributes, Ref } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string | null | undefined;
}

function Input(props: InputProps, ref: Ref<HTMLInputElement>) {
  const { label, error } = props;
  const { id, type, placeholder, onChange } = props;

  return (
    <div className="w-full">
      <label htmlFor="email" className="text-brand-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${error && "border-red-300"} mt-2 w-full`}
        onChange={onChange}
        ref={ref}
      />
      {error && <p className="error mt-3 ml-[2px]">{error}</p>}
    </div>
  );
}

export default forwardRef(Input);
