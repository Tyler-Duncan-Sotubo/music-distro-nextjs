"use client";

import { Button } from "@/app/_components/Button";
import TextInput from "@/app/_components/TextInput";
import Label from "@/app/_components/Label";
import { useRouter } from "next/navigation";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type ForgotPasswordInput } from "../types";
import { ForgotPasswordSchema } from "../schemas";

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: yupResolver(
      ForgotPasswordSchema,
    ) as Resolver<ForgotPasswordInput>,
  });
  const onSubmit = (data: ForgotPasswordInput) => {
    console.log(data);
  };

  return (
    <section className="py-6">
      <h5 className="text-gray-600 py-6">
        Forgot your password? No problem. Just let us know your email email
        address and we will email you a password reset link that that will allow
        you to choose a new one.
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

        <div className="my-8 flex items-center justify-end">
          <Button className="px-8">Email Password Reset</Button>
        </div>
      </form>
    </section>
  );
};

export default Page;
