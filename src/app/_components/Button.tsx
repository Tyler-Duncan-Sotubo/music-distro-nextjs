import React from "react";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  className?: string;
  color?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({
  type = "submit",
  className,
  color = "text-white",
  onClick,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`${className} ${color} bg-primary hover:bg-primaryHover active:bg-primaryHover ring-primaryHover inline-flex items-center rounded-lg px-10 py-3 text-[.8rem] font-semibold uppercase tracking-widest transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none focus:ring disabled:opacity-25`}
    {...props}
    onClick={onClick}
  >
    {props.children}
  </button>
);
