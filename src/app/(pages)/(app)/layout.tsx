"use client";

import Footer from "@/app/_components/Footer";
import Navigation from "@/app/_components/Navigation";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <header className="md:mt-20">
        <Navigation />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AppLayout;
