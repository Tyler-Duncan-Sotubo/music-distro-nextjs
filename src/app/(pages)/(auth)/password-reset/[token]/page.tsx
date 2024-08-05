"use client";

import { Button } from "@/app/_components/Button";
import Label from "@/app/_components/Label";
import TextInput from "@/app/_components/TextInput";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type ResetPasswordInput } from "../../types";
import { resetPasswordSchema } from "../../schemas";

const PasswordReset = () => {
  const [error, setError] = useState<string | null>("");
  const { token } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: yupResolver(resetPasswordSchema) as Resolver<ResetPasswordInput>,
  });
  const onSubmit = (data: ResetPasswordInput) => {
    // Check if the user has agreed to the terms of service
    const resetData = { ...data, token };
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

        <div className="my-8 flex items-center justify-end">
          <Button className="px-8">Reset Password</Button>
        </div>
      </form>
    </section>
  );
};

export default PasswordReset;
