import { IError } from "../../api/interfaces/IError";

interface ErrorBoxProps {
  errors: IError;
}

export function ErrorBox({ errors }: ErrorBoxProps) {
  return (
    <div className="w-full rounded-md border border-red-500 bg-red-100 p-3 text-red-500">
      <p className="mb-5 text-sm font-semibold">Review the errors and try again</p>
      <ul className="list-inside list-disc">
        {Object.entries(errors).map(([_, message], index) => (
          <li key={index} className="text-xs">
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
