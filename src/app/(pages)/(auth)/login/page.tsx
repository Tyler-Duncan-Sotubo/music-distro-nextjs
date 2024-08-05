"use client";

import { Button } from "@/app/_components/Button";
import Label from "@/app/_components/Label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormDescription from "@/app/_components/FormDescription";
import {
  type FieldValues,
  type Resolver,
  useForm,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type LoginInput } from "../types";
import { LoginSchema } from "../schemas";
import TextInput from "@/app/_components/TextInput";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  // Login State Management with Redux
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
      console.error(signInResponse.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
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
        <div className="mt-4">
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
        <div className="mt-6 flex items-center justify-between">
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
            <span className="text-gray-600 ml-2 text-lg">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-blue-800 hover:text-gray-900 text-lg hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-end">
          <Button className="ml-3 px-8">Login</Button>
        </div>
      </form>
    </>
  );
};

export default Login;
