import Link from "next/link";
import React from "react";

type NavLinkProps = {
  active?: boolean;
  children: React.ReactNode;
  href: string;
};

export const NavLink = ({
  active = false,
  children,
  ...props
}: NavLinkProps) => (
  <Link
    {...props}
    className={`inline-flex items-center px-1 py-2 text-sm font-medium leading-5 text-black transition duration-500 ease-in-out focus:outline-none ${
      active
        ? "border-primary text-primary border-b-2 border-indigo-400 text-gray-900 focus:border-indigo-700"
        : "hover:text-primary hover:border-primary hover:border-b-2 focus:border-gray-300 focus:text-gray-700"
    }`}
  >
    {children}
  </Link>
);
