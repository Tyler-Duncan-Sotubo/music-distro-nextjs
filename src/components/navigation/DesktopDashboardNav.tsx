import Link from "next/link";
import React from "react";
import ApplicationLogo from "@/components/ui/ApplicationLogo";
import { dashboardNav, profileData, uploadData } from "@/data/data";
import { NavLink } from "./NavLinks";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import DropDown from "@/components/common/DropDown";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";

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

  const photo = api.photo.getProfilePhoto.useQuery();

  return (
    <nav
      className="absolute top-0 mx-auto hidden w-full border-b border-gray bg-white px-10 py-4 md:flex md:items-center md:justify-between md:gap-10 md:px-20 md:py-5"
      id="nav"
    >
      <div className="flex items-center justify-between gap-10">
        <Link href="/dashboard">
          <ApplicationLogo />
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
          </div>
          {/* Upload Dropdown */}
          <DropDown data={uploadData} loggedInUser={loggedInUser as User} />
        </div>

        {/* User Profile */}
        <div className="group relative z-50 cursor-pointer">
          <div className="flex items-center gap-2">
            {photo?.data?.image ? (
              <div className="relative h-12 w-12 rounded-full">
                <Image
                  fill
                  src={photo?.data?.image || ""}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="user profile image"
                  className="rounded-full"
                />
              </div>
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
