"use client";

import Link from "next/link";
import { Button } from "./Button";
import { useLayoutEffect, useState } from "react";
import React from "react";

export const LoginLinks = () => {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative flex items-center gap-5">
      <div className="">
        {isMounted ? (
          <>
            <Link href="/login">
              <Button
                className="border-primary border-2 bg-white hover:text-white"
                color="text-black"
              >
                Login
              </Button>
            </Link>
            <Link href="/register" className="ml-4">
              <Button>Sign Up</Button>
            </Link>
          </>
        ) : (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
