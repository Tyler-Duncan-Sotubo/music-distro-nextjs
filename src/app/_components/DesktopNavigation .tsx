"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { LoginLinks } from "./LoginLinks";
import { NavLink } from "./NavLinks";
import { navData } from "../_data/data";
import ApplicationLogo from "./ApplicationLogo";
import Link from "next/link";

type navDataType = {
  name: string;
  href: string;
};

export const DesktopNavigation = () => {
  const pathname = usePathname();
  return (
    <nav
      className="absolute top-0 mx-auto hidden w-full bg-white px-10 py-4 shadow-lg lg:flex lg:items-center lg:justify-between"
      id="nav"
    >
      <div className="flex gap-20">
        <Link href="/">
          <ApplicationLogo className={"h-14 w-14 fill-current text-black"} />
        </Link>
        <ul className="flex items-center gap-6">
          {navData.map((item: navDataType, index: number) => (
            <li key={index}>
              <NavLink href={item.href} active={pathname === item.href}>
                <p className="text-black hover:text-blue-700">{item.name}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <LoginLinks />
    </nav>
  );
};
