import AuthCard from "./_components/AuthCard";

export const metadata = {
  title: "WePlugMusic",
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className="text-gray-900 font-sans antialiased">
        <AuthCard>{children}</AuthCard>
      </div>
    </div>
  );
};

export default Layout;
