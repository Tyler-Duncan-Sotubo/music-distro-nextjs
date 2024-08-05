"use client";

import { Button } from "@/app/_components/Button";
import SubmitErrorComponent from "@/app/_components/SubmitErrorComponent";
import Label from "@/app/_components/Label";
import Link from "next/link";
import { useState } from "react";
import FormDescription from "@/app/_components/FormDescription";
import { useRouter } from "next/navigation";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/app/_components/TextInput";
import { type IFormInput } from "../types";
import { registerSchema } from "../schemas";

const Page = () => {
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<Array<string | undefined>>([]);
  const [error, setErrors] = useState<string>("");

  const router = useRouter();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema) as Resolver<IFormInput>,
  });

  const onSubmit = async (data: IFormInput) => {
    // Check if the user has agreed to the terms of service
    if (!agreeToTerms) {
      setErrors("You must agree to the terms of service");
      return;
    } else {
      setErrors("");
    }

    // Make the API request

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Handle the response
    if (res.ok) {
      router.push("/login");
    } else {
      const { message } = await res.json();
      setSubmitError(message as Array<string | undefined>);
    }
  };

  console.log(submitError);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormDescription
        header="Create An Account"
        path="/login"
        pathText="Log in"
        authQuestion="Already have an account?"
      />

      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="name"
          error={errors.name?.message}
          id="name"
          type="text"
        />
      </div>

      {/* Email Address */}
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="email"
          error={errors.email?.message}
          id="email"
          type="email"
        />
      </div>

      {/* Password  */}
      <div className="relative mt-4">
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
        <Label htmlFor="password_confirmation">Confirm Password</Label>

        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="password_confirmation"
          error={errors.password_confirmation?.message}
          id="password_confirmation"
          type="password"
        />
      </div>

      {/* Errors */}
      <SubmitErrorComponent message={submitError} />

      {/* Terms and Conditions */}
      <div className="mt-8 block">
        <label htmlFor="agreeToTerms" className="inline-flex items-center">
          <input
            data-testid="agreeToTerms"
            id="agreeToTerms"
            type="checkbox"
            name="agreeToTerms"
            className="border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring-indigo-200 rounded shadow-sm focus:ring focus:ring-opacity-50"
            onChange={(event) => setAgreeToTerms(event.target.checked)}
          />
          <span className="text-blue-600 ml-2 text-lg hover:underline">
            <Link href="/terms" target="_blank">
              <h5>I have read and agree to our terms of service</h5>
            </Link>
          </span>
        </label>
        {/* Errors For Terms and Conditions */}
        {error && <p className="my-2 text-error">{error}</p>}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex items-center justify-end">
        <Button>Sign Up</Button>
      </div>
    </form>
  );
};

export default Page;