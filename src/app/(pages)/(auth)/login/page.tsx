"use client";

import { useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormDescription from "@/components/forms/FormDescription";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type LoginInput } from "../types";
import { LoginSchema } from "../schemas";
import TextInput from "@/components/ui/TextInput";
import { signIn, useSession } from "next-auth/react";
import { ButtonWithIcon } from "@/components/ui/ButtonWithIcon";

const Login = () => {
  const router = useRouter();
  // Login State Management with Redux
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(LoginSchema) as Resolver<LoginInput>,
  });

  const onSubmit = async (data: LoginInput) => {
    const signInResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (signInResponse?.error) {
      setSubmitError(signInResponse.error);
    } else {
      setSubmitError("");
      router.push("/dashboard");
    }
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
    <section className="py-6">
      <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
        <FormDescription
          header="Welcome Back!"
          path="/register"
          pathText="Sign Up"
          authQuestion="New user?"
        />

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

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <TextInput
            register={register as unknown as UseFormRegister<FieldValues>}
            name="password"
            error={errors.password?.message}
            id="name"
            type="password"
          />
        </div>

        {/* Remember Me */}
        <div className="mt-4 flex items-center justify-between">
          <label
            htmlFor="remember_me"
            className="inline-flex items-center"
            data-testid="remember me"
          >
            <input
              id="remember_me"
              type="checkbox"
              {...register("shouldRemember")}
              className="border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring-indigo-200 rounded shadow-sm focus:ring focus:ring-opacity-50"
            />
            <span className="text-gray-600 ml-2 text-sm">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-blue-800 hover:text-gray-900 text-sm hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Error */}
        {submitError && (
          <p className="mt-7 text-center text-[.9rem] text-error">
            {submitError}
          </p>
        )}

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-end">
          <Button className="ml-3 px-8">Login</Button>
        </div>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center justify-center space-x-4">
        <p className="h-[2px] w-1/2 bg-gray"></p>
        <p>or</p>
        <p className="h-[2px] w-1/2 bg-gray"></p>
      </div>

      {/* Warning */}
      <p className="text-center text-sm text-error">
        if you signed up with your email and password, please use that to login
      </p>

      {/* Login With Google*/}
      <div className="mt-6 w-full">
        <ButtonWithIcon onClick={() => googleSignIn()} iconName="google">
          Login in With Google
        </ButtonWithIcon>
      </div>
    </section>
  );
};

export default Login;
