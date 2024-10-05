import React, {
  type ButtonHTMLAttributes,
  type FC,
  type ReactNode,
} from "react";

// Define the types for props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
  isLoading?: boolean;
}

// Reusable Button component
const DocumentButton: FC<ButtonProps> = ({
  variant = "primary", // Default to 'primary'
  children,
  isLoading = false,
  className = "", // Allow additional custom classes
  ...props
}) => {
  // Define different style variants
  const baseClasses =
    "px-12 py-2 rounded-md font-semiBold transition-all duration-300 ease-in-out focus:outline-none";

  const variants = {
    primary:
      "bg-button text-white hover:bg-buttonHover focus:ring-2 focus:button text-sm",
    secondary:
      "bg-secondaryButton text-white  hover:bg-buttonHover focus:ring-2 focus:secondaryButton",
  };

  // Loading spinner (if needed)
  const loadingSpinner = (
    <svg
      className="h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className} ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          {loadingSpinner}
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default DocumentButton;
