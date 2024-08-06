"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import Label from "@/components/ui/Label";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type ForgotPasswordInput } from "../types";
import { ForgotPasswordSchema } from "../schemas";
import Link from "next/link";

const Page = () => {
  const [error, setError] = useState<string | null>(null);
  const [passwordResetTokenSent, setPasswordResetTokenSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: yupResolver(
      ForgotPasswordSchema,
    ) as Resolver<ForgotPasswordInput>,
  });

  const passwordReset = api.password.sendPasswordResetToken.useMutation({
    onSuccess: () => {
      setPasswordResetTokenSent(true);
      setError("");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    passwordReset.mutate(data);
  };

  return (
    <section className="py-6">
      {passwordResetTokenSent ? (
        <>
          <h5 className="text-gray-600 py-6">
            If there is an account associated with the email you provided, you
            will receive an email with a link to reset your password.
          </h5>
          <Link className="my-8 flex items-center justify-end" href="/">
            <Button className="px-8">Go to Homepage</Button>
          </Link>
        </>
      ) : (
        <>
          <h5 className="text-gray-600 py-6">
            Forgot your password? No problem. Just let us know your email email
            address and we will email you a password reset link that that will
            allow you to choose a new one.
          </h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Address */}
            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                register={register as unknown as UseFormRegister<FieldValues>}
                name="email"
                error={errors.email?.message}
                id="name"
                type="email"
              />
            </div>

            {error && (
              <div className="font-semiBold py-2 text-center text-sm text-error">
                {error}
              </div>
            )}

            <div className="my-8 flex items-center justify-end">
              <Button className="px-8">Email Password Reset</Button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default Page;
