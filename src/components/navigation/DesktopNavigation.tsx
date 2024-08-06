"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { NavLink } from "./NavLinks";
import { navData } from "../../data/data";
import ApplicationLogo from "../ui/ApplicationLogo";
import Link from "next/link";
import { Button } from "../ui/Button";
import { useSession } from "next-auth/react";

type navDataType = {
  name: string;
  href: string;
};

export const DesktopNavigation = () => {
  const { data: session } = useSession();
  const user = !!session?.user;

  const pathname = usePathname();
  return (
    <nav
      className="absolute top-0 mx-auto hidden w-full bg-white px-10 py-4 shadow-lg lg:flex lg:items-center lg:justify-between"
      id="nav"
    >
      <div className="flex gap-20">
        <Link href="/">
          <ApplicationLogo className={"fill-current h-14 w-14 text-black"} />
        </Link>
        <ul className="flex items-center gap-6">
          {navData.map((item: navDataType, index: number) => (
            <li key={index}>
              <NavLink href={item.href} active={pathname === item.href}>
                <p className="hover:text-blue-700 text-black">{item.name}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative flex items-center gap-5">
        <div className="">
          {user ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button
                  className="border-2 border-primary bg-white hover:text-white"
                  color="text-black"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" className="ml-4">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
