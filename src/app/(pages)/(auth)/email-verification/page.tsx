"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const EmailVerified = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  return (
    <div>
      {success === "token-expired" ? (
        <div className="mx-auto my-10 flex w-[90%] flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-center text-2xl font-bold">Token Expired</h1>
          <p className="mt-2 text-xl">
            The verification token has expired. Please request a new one.
          </p>
          <div className="mt-4">
            <Link href="/verify-email">
              <Button
                className="border-2 border-primary bg-white hover:text-white"
                color="text-black"
              >
                Request New Token
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto my-10 flex w-[90%] flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-center text-2xl font-bold">Verified!</h1>
          <p className="mt-2 text-xl">
            You have successfully verified your email address.
          </p>
          <div className="mt-4">
            <Link href="/dashboard">
              <Button
                className="border-2 border-primary bg-white hover:text-white"
                color="text-black"
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerified;
