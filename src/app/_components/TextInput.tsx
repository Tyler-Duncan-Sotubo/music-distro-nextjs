import { type UseFormReturn } from "react-hook-form";

type InputProps = {
  className?: string;
  name: string;
  register: UseFormReturn["register"];
  error?: string;
  id: string;
  type: string;
  placeholder?: string;
};

const TextInput = ({
  className,
  register,
  name,
  error,
  ...rest
}: InputProps) => (
  <div className="relative mb-6">
    <input
      className={`${className} border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 w-full rounded-md bg-secondary py-2 shadow-sm focus:ring focus:ring-opacity-50`}
      {...register(name)}
      {...rest}
    />
    {error && (
      <span
        role="alert"
        className="text-bold my-2 text-sm text-error"
        aria-label="error-message"
      >
        {error}
      </span>
    )}
  </div>
);

export default TextInput;
