"use client";

import { Button } from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ForgotConfirmation = () => {
  const router = useRouter();

  return (
    <section className="py-6">
      <h3 className="font-bold text-black">Please check your email</h3>
      <p className="py-4 text-black">
        An email with instructions to create your password has been sent to your
        email. You may need to wait a few minutes to receive the email, or check
        your spam or junk folders. Didn&apos;t get an email?
      </p>

      <div className="my-8 flex items-center justify-end">
        <Button className="px-8" onClick={() => console.log("clicked")}>
          Resend Email
        </Button>
      </div>
    </section>
  );
};

export default ForgotConfirmation;
