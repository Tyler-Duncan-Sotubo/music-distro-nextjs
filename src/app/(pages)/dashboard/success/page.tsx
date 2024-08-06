"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { useEffect } from "react";
import { clearCart } from "@/redux/slices/cartSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";

const page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <div className="flex flex-col justify-center items-center my-48 gap-6">
      <div>
        <h1 className="text-3xl font-bold text-center">Payment Successful</h1>
        <p className="text-lg ">
          Your payment has been successfully processed.
        </p>
      </div>
      <svg
        className="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52">
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
            className="bg-white border-primary hover:text-white border-2"
            color="text-black">
            New Music Release
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
