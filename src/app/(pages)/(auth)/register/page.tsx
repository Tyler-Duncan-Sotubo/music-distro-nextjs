"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/Button";
import SubmitErrorComponent from "@/components/forms/SubmitErrorComponent";
import Label from "@/components/ui/Label";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import FormDescription from "@/components/forms/FormDescription";
import { useRouter } from "next/navigation";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@/components/ui/TextInput";
import { type IFormInput } from "../types";
import { registerSchema } from "../schemas";
import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const Page = () => {
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<Array<string | undefined>>([]);
  const [error, setErrors] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema) as Resolver<IFormInput>,
  });

  // Register
  const registerUser = api.register.registerUser.useMutation({
    onSuccess: async (data) => {
      if (!data) return;
      setIsLoading(false);
      router.push("/login");
    },
    onError: (error) => {
      setIsLoading(false);
      setSubmitError([error.message]);
    },
  });

  const onSubmit = async (data: IFormInput) => {
    setIsLoading(true);
    // Check if the user has agreed to the terms of service
    if (!agreeToTerms) {
      setErrors("You must agree to the terms of service");
      return;
    } else {
      setErrors("");
    }

    if (registerUser.isPending) {
      setSubmitError([]);
    }
    // Make the API request
    registerUser.mutate(data);
  };

  const googleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  // Redirect to dashboard if user is already logged in
  const { data: session } = useSession();
  useLayoutEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [router, session]);

  return (
    <>
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
        <div>
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
        <div>
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
        <div>
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
        <div className="mt-4 block">
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
        <div className="mt-5 flex items-center justify-end">
          <Button loading={isLoading} className="w-1/2">
            Sign Up
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="my-4 flex items-center justify-center space-x-4">
        <p className="h-[2px] w-1/2 bg-gray"></p>
        <p>or</p>
        <p className="h-[2px] w-1/2 bg-gray"></p>
      </div>

      {/* Login With Google*/}
      <div className="my-6 w-full">
        <Button className="w-full" onClick={() => googleSignIn()}>
          <FaGoogle /> Login with Email
        </Button>
      </div>
    </>
  );
};

export default Page;
