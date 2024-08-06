"use client";

import DashboardNavigation from "../../_components/DashboardNavigation";
import Footer from "@/app/_components/Footer";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <header>
        <DashboardNavigation />
      </header>
      <main className="mx-auto w-[90%] md:mt-24">{children}</main>
      <Footer />
    </>
  );
};

export default DashboardLayout;
