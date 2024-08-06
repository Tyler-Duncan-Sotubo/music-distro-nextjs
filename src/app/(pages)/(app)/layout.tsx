"use client";

import Footer from "@/components/layout/Footer";
import Navigation from "@/components/navigation/Navigation";

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
