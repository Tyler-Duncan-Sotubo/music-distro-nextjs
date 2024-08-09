import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { NextAuthProvider } from "@/server/provider/nextAuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "We Plug Music | Music Distribution and Promotion Services",
  description:
    "Music distribution and promotion services for independent artists",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Suspense fallback={<div></div>}>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </Suspense>
        </NextAuthProvider>
        <ToastContainer autoClose={3000} />
      </body>
    </html>
  );
}
