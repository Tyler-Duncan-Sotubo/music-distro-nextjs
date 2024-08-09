"use client";

import DashboardNavigation from "@/components/navigation/DashboardNavigation";
import Footer from "@/components/layout/Footer";

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
