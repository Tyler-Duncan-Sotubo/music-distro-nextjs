"use client";

import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { signOut } from "next-auth/react";

type User = {
  name: string;
  email: string;
  image: string;
};

type DropDownProps = {
  data: {
    name: string;
    href: string;
    icon: React.ReactNode;
  }[];
  includesLogout?: boolean;
  includesUserDetails?: boolean;
  loggedInUser: User;
};

const DropDown = ({
  data,
  includesLogout = false,
  includesUserDetails = false,
  loggedInUser,
}: DropDownProps) => {
  return (
    <div className="absolute right-0 top-3/4 hidden w-[250px] rounded-2xl bg-white p-3 shadow-md group-hover:block">
      {includesUserDetails && (
        <div className="mb-6 flex items-center gap-2">
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
          <span className="font-bold">{loggedInUser?.name}</span>
        </div>
      )}
      <ul className="my-2 flex flex-col gap-2">
        {data.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer rounded-lg px-3 py-2 opacity-85 hover:bg-secondary"
          >
            <Link href={item.href}>
              <div className="flex items-center gap-2">
                {item.icon}
                <h5>{item.name}</h5>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {includesLogout && (
        <div
          className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 hover:bg-secondary"
          onClick={() =>
            signOut({
              callbackUrl: "/", // redirect to home page after logout
            })
          }
        >
          <MdLogout size={20} />
          <h5>Logout</h5>
        </div>
      )}
    </div>
  );
};

export default DropDown;
