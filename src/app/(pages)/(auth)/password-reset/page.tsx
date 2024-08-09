"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import TextInput from "@/components/ui/TextInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type ResetPasswordInput } from "../types";
import { resetPasswordSchema } from "../schemas";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | null>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: yupResolver(resetPasswordSchema) as Resolver<ResetPasswordInput>,
  });

  const resetPassword = api.password.resetPassword.useMutation({
    onSuccess: () => {
      toast.success("Password Reset Successful", {
        position: "top-right",
      });
      router.push("/login");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  // Reset Password
  const onSubmit = (data: ResetPasswordInput) => {
    const resetData = { ...data, token: token ?? "" };
    // Call the resetPassword mutation
    resetPassword.mutate(resetData);
  };

  return (
    <section className="py-6">
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

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <TextInput
            register={register as unknown as UseFormRegister<FieldValues>}
            name="password"
            error={errors.password?.message}
            id="password"
            type="password"
          />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>
          <TextInput
            register={register as unknown as UseFormRegister<FieldValues>}
            name="password_confirmation"
            error={errors.password_confirmation?.message}
            id="password_confirmation"
            type="password"
          />
        </div>

        {/* Error */}
        {error && <div className="mt-4 text-error">{error}</div>}

        {/* Reset Password Button */}
        <div className="my-8 flex items-center justify-end">
          <Button className="px-8">Reset Password</Button>
        </div>
      </form>
    </section>
  );
};

export default PasswordReset;
