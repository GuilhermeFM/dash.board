import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  text: string;
}

export function Button({ className, disabled, loading, text }: ButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className={`${
        className ?? ""
      } w-full cursor-pointer rounded bg-brand-800 p-3 text-center text-white transition-all duration-300 hover:bg-brand-900 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-brand-400 disabled:shadow-none`}
    >
      {loading && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />}
      {!loading && <span>{text}</span>}
    </button>
  );
}
