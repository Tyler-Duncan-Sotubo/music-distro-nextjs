import { type UseFormReturn } from "react-hook-form";

type InputProps = {
  disabled?: boolean;
  className?: string;
  name: string;
  register: UseFormReturn["register"];
  error?: string;
  id: string;
  type: string;
};

const SocialInput = ({
  className,
  register,
  name,
  error,
  ...rest
}: InputProps) => (
  <div className="relative mb-6">
    <div className="absolute flex h-full items-center rounded-lg px-2">
      <p className="text-bold">@</p>
    </div>

    <input
      className={`${className} border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 w-full rounded-md bg-secondary px-6 shadow-sm focus:ring focus:ring-opacity-50`}
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

export default SocialInput;
