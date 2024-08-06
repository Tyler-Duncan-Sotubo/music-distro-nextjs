import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import ApplicationLogo from "./ApplicationLogo";
import { MdClose } from "react-icons/md";
import { dashboardNav, profileData, uploadData } from "../_data/data";
import { NavLink } from "./NavLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSession, signOut } from "next-auth/react";

type MobileDashboardNavProps = {
  RenderCartButton: () => JSX.Element;
};

type User = {
  name: string;
  email: string;
  image: string;
};

const MobileDashboardNav = ({ RenderCartButton }: MobileDashboardNavProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleSignOut() {
    await signOut({
      callbackUrl: "/",
    });
    setIsOpen(false);
  }

  const { data: session } = useSession();
  const loggedInUser = session?.user;
  return (
    <nav className="relative mb-10 mt-2 w-full text-primary md:hidden" id="nav">
      <section className="flex items-center justify-between px-5 py-3">
        {/* Cart */}
        <RenderCartButton />
        {/* Logo */}
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

      {/* Mobile Navigation */}
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

        {/* Welcome Message for user */}
        <p className="px-10 pb-10 text-2xl text-black">
          Welcome, {loggedInUser?.name}
        </p>

        {/* Mobile Navigation Links */}
        <ul className="px-10">
          {dashboardNav.map((item, index: number) => {
            return (
              <li
                key={index}
                className="text-background font-regular mt-3 text-2xl capitalize"
                onClick={() => setIsOpen(false)}
              >
                <NavLink href={item.href} active={pathname === item.href}>
                  <h4 className="hover:text-blue-700 text-lg text-black">
                    {item.name}
                  </h4>
                </NavLink>
              </li>
            );
          })}
          {uploadData.map((item, index: number) => {
            return (
              <li
                key={index}
                className="text-background font-regular mt-3 capitalize"
                onClick={() => setIsOpen(false)}
              >
                <NavLink href={item.href} active={pathname === item.href}>
                  <h4 className="hover:text-blue-700 text-lg text-black">
                    {item.name}
                  </h4>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Mobile Navigation Login Links */}

        <ul className="mx-auto my-10 w-[80%] border-t-2">
          {profileData.map((item, index: number) => {
            return (
              <li
                key={index}
                className="mt-2 text-xl capitalize"
                onClick={() => setIsOpen(false)}
              >
                <NavLink href={item.href} active={pathname === item.href}>
                  <h4 className="text-lg text-black">{item.name}</h4>
                </NavLink>
              </li>
            );
          })}
          <div
            className="ml-1 cursor-pointer hover:text-primary"
            onClick={() => handleSignOut()}
          >
            <h4 className="inline-block py-3 text-lg font-medium capitalize text-black hover:border-b-2 hover:border-primary">
              logout
            </h4>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default MobileDashboardNav;
