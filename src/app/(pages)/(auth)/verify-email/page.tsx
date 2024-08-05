"use client";

import { Button } from "@/app/_components/Button";
import { useState, useEffect } from "react";

const Page = () => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const user = true;
  const emailVerificationStatus = "successful";

  const handleResendVerificationEmail = async () => {
    if (!user) {
      setError("You need to login to resend verification email");
    } else {
    }
  };

  return (
    <section className="py-6">
      <div className="mb-4 text-lg tracking-wide text-black">
        <p>
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn&apos;t receive the email, we will gladly send you another.
        </p>
      </div>

      {emailVerificationStatus === "successful" && (
        <div className="my-6 text-sm font-medium text-green-600">
          <p>
            A new verification link has been sent to the email address you
            provided during registration.
          </p>
        </div>
      )}

      {/* Display Resend Error If Any  */}
      {error && (
        <div className="mb-4 text-lg font-medium tracking-wide text-error">
          {error}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Button onClick={() => handleResendVerificationEmail()}>
          Resend Verification Email
        </Button>
      </div>
    </section>
  );
};

export default Page;
