import ApplicationLogo from "@/app/_components/ApplicationLogo";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Navigation from "@/app/_components/Navigation";

type SupportLayoutProps = {
  children: React.ReactNode;
};

const SupportLayout = ({ children }: SupportLayoutProps) => {
  return (
    <>
      <header>
        <Navigation />
      </header>

      {/* children */}
      <main>{children}</main>
      <footer className="mb-20 mt-44 flex flex-col items-center justify-center">
        <Link href="/">
          <ApplicationLogo className="h-16 w-16" />
        </Link>
        <p className="mt-10 text-center">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
        <div className="mt-3 flex justify-between gap-1">
          <Link href="/terms">
            <p>Terms of Service</p>
          </Link>
          <span className="mx-2">|</span>
          <Link href="/privacy">
            <p>Privacy Policy</p>
          </Link>
        </div>
        <div className="mt-6 flex justify-between gap-4">
          <FaFacebook size={30} />
          <FaTwitter size={30} />
          <FaInstagram size={30} />
        </div>
      </footer>
    </>
  );
};

export default SupportLayout;
