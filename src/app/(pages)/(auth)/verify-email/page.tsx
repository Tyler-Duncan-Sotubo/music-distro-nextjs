"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const Page = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const resendVerificationEmail = api.verify.verifyUser.useMutation({
    onError: (error) => {
      setError(error.message);
    },
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const handleResendVerificationEmail = () => {
    resendVerificationEmail.mutate();
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

      {error === "UNAUTHORIZED" && (
        <div className="bg-red-100 mt-4 rounded text-error">
          <p>
            Your session has expired. Please log in again to resend the
            verification email.
          </p>
        </div>
      )}

      {success && (
        <div className="bg-red-100 mt-4 rounded text-green-600">
          <p>
            Verification email sent. Please check your inbox and spam folder.
          </p>
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
