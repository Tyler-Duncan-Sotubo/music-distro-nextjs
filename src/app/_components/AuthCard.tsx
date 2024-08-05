"use client";

import { distros } from "@/app/_data/data";
import Image from "next/image";
import Navigation from "./Navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AuthCardProps = Readonly<{
  children: React.ReactNode;
}>;

const AuthCard = ({ children }: AuthCardProps) => {
  const pathname = usePathname();

  return (
    <div
      className={`bg-[url('/img/hero/vevo.jpg')] bg-cover px-4 ${
        pathname === "/login" || pathname === "/forgot-password"
          ? "py-36 md:py-10"
          : "py-10"
      } flex min-h-screen flex-col items-center justify-between bg-cover pt-6 sm:flex-row sm:justify-center sm:gap-20 sm:px-0 sm:pt-0`}
    >
      <div className="block w-full bg-white sm:hidden">
        <Navigation />
      </div>
      <div className="hidden flex-col sm:flex sm:w-1/2 sm:gap-10">
        <Link href="/" className="flex justify-center">
          <div className="relative h-44 w-1/4">
            <Image
              src="/img/mobilelogo.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        <h1 className="font-bold capitalize text-white drop-shadow-2xl">
          The simplest way to sell your music globally. Without hidden fees.
        </h1>
        <div className="flex flex-wrap items-center gap-5">
          {distros.map((distro, index) => (
            <div
              key={index}
              className="relative ml-3 h-12 w-24 duration-300 hover:scale-125"
            >
              <Image
                src={distro.image}
                alt={`logo of ${distro.name}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-xl`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
