import React from "react";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  className?: string;
  color?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({
  type = "submit",
  className,
  color = "text-white",
  onClick,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`${className} ${color} hover:bg-blue-500 inline-flex items-center rounded-lg bg-primary px-10 py-3 text-[.9rem] font-bold tracking-widest ring-primaryHover transition duration-300 ease-in-out hover:bg-primaryHover hover:text-white focus:outline-none focus:ring active:bg-primaryHover disabled:opacity-25`}
    {...props}
    onClick={onClick}
    disabled={disabled}
  >
    {props.children}
  </button>
);
