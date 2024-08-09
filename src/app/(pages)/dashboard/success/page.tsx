"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const page = () => {
  return (
    <div className="my-48 flex flex-col items-center justify-center gap-6">
      <div>
        <h1 className="text-center text-3xl font-bold">Payment Successful</h1>
        <p className="text-lg">Your payment has been successfully processed.</p>
      </div>
      <svg
        className="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className="checkmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      <div className="mt-4">
        <Link href="/dashboard/music">
          <Button
            className="border-2 border-primary bg-white hover:text-white"
            color="text-black"
          >
            New Music Release
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
