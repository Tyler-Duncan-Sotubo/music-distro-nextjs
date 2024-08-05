"use client";

import { useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import { NavLink } from "./NavLinks";
import ApplicationLogo from "./ApplicationLogo";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { mobileNavData, mobileLoginNavData } from "../_data/data";
import { useSession } from "next-auth/react";

export const MobileNavigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: session } = useSession();
  const user = !!session?.user;

  return (
    <nav className="relative w-full text-primary shadow-xl lg:hidden" id="nav">
      <section className="flex justify-between px-5 py-3">
        <Link href="/">
          <ApplicationLogo className={"fill-current h-10 w-10 text-black"} />
        </Link>
        <div className="flex items-center gap-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-[9998] cursor-pointer"
          >
            <GiHamburgerMenu className="text-4xl" />
          </button>
        </div>
      </section>
      <div
        className={`fixed top-0 z-[9999] h-screen w-[83%] cursor-pointer bg-white duration-300 ${isOpen ? "right-0 md:right-16" : "right-[-400px] opacity-0"}`}
      >
        <div className="flex justify-end px-5 py-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-[9999] cursor-pointer"
          >
            <MdClose className="text-4xl" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <ul className="px-10">
          {mobileNavData.map((item, index: number) => {
            return (
              <li
                key={index}
                className="text-background font-regular mt-4 text-2xl capitalize"
                onClick={() => setIsOpen(false)}
              >
                <NavLink href={item.href} active={pathname === item.href}>
                  <h4 className="hover:text-blue-700 text-xl text-black">
                    {item.name}
                  </h4>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Mobile Navigation Login Links */}
        {user ? (
          <div className="mx-auto my-14 w-[80%] border-t-2 text-center">
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <h4 className="mt-10 rounded-xl bg-primary px-6 py-4 text-xl text-white">
                Dashboard
              </h4>
            </Link>
          </div>
        ) : (
          <ul className="mx-auto my-14 w-[80%] border-t-2 border-dashed">
            {mobileLoginNavData.map((item, index: number) => {
              return (
                <li
                  key={index}
                  className="text-background font-regular mt-3 text-2xl capitalize"
                  onClick={() => setIsOpen(false)}
                >
                  <NavLink href={item.href} active={pathname === item.href}>
                    <h4 className="hover:text-blue-700 text-xl text-black">
                      {item.name}
                    </h4>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
};
