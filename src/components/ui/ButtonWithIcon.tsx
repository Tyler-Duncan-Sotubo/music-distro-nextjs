import React from "react";
import { FaGoogle } from "react-icons/fa";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  className?: string;
  color?: string;
  children: React.ReactNode;
  onClick?: () => void;
  iconName?: string;
};

export const ButtonWithIcon = ({
  type = "submit",
  className,
  color = "text-white",
  onClick,
  iconName,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`${className} ${color} hover:bg-blue-500 flex w-full items-center justify-center rounded-lg bg-primary px-10 py-3 text-center text-[.9rem] font-bold tracking-widest ring-primaryHover transition duration-300 ease-in-out hover:bg-primaryHover hover:text-white focus:outline-none focus:ring active:bg-primaryHover disabled:opacity-25`}
    {...props}
    onClick={onClick}
  >
    {iconName === "google" && <FaGoogle className="mr-2" size={25} />}
    {props.children}
  </button>
);
