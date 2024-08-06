import Link from "next/link";
import React from "react";
import ApplicationLogo from "./ApplicationLogo";
import { dashboardNav, profileData, uploadData } from "@/data/data";
import { NavLink } from "./NavLinks";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import DropDown from "./DropDown";
import Image from "next/image";
import { useSession } from "next-auth/react";

type DesktopDashboardNavProps = {
  RenderCartButton: () => JSX.Element;
};

type User = {
  name: string;
  email: string;
  image: string;
};

const DesktopDashboardNav = ({
  RenderCartButton,
}: DesktopDashboardNavProps) => {
  const pathname = usePathname();

  const { data: session } = useSession();
  const loggedInUser = session?.user;

  return (
    <nav
      className="absolute top-0 mx-auto hidden w-full bg-white px-10 py-4 md:flex md:items-center md:justify-between md:gap-10 md:px-20 md:py-5"
      id="nav"
    >
      <div className="flex justify-between gap-10">
        <Link href="/">
          <ApplicationLogo className={"fill-current h-14 w-14 text-black"} />
        </Link>
        <ul className="flex justify-center gap-6">
          {dashboardNav.map((item, index) => (
            <li key={index}>
              <NavLink href={item.href} active={pathname === item.href}>
                <h5 className="hover:text-blue-700 text-black">{item.name}</h5>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Dashboard User Nav */}
      <div className="flex items-center gap-8">
        {/* Cart */}
        <RenderCartButton />

        {/* Upload Options */}
        <div className="group relative z-50 cursor-pointer">
          <div className="flex items-center gap-1">
            <h4 className="font-bold">Upload</h4>
            <FaChevronDown size={20} color="#1e40af" />
          </div>
          {/* Upload Dropdown */}
          <DropDown data={uploadData} loggedInUser={loggedInUser as User} />
        </div>

        {/* User Profile */}
        <div className="group relative z-50 cursor-pointer">
          <div className="flex items-center">
            {loggedInUser?.image ? (
              <Image
                src={loggedInUser.image}
                width={50}
                height={50}
                className="rounded-full"
                alt="user profile image"
              />
            ) : (
              <FaUserCircle size={50} color="#1e40af" />
            )}
            <FaChevronDown size={20} color="#1e40af" />
          </div>
          {/* Profile Dropdown */}
          <DropDown
            data={profileData}
            includesLogout
            includesUserDetails
            loggedInUser={loggedInUser as User}
          />
        </div>
      </div>
    </nav>
  );
};

export default DesktopDashboardNav;
