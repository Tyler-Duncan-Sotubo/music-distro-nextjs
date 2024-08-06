"use client";

import { PaystackButton } from "react-paystack";
import { useRouter } from "next/navigation";
import { type User } from "next-auth";
import { api } from "@/trpc/react";
import { env } from "@/env";

type CartItem = {
  cartItem: cartItem | undefined;
  user: User | undefined;
};

type cartItem = {
  product: string;
  description: string;
  price: number;
  price_in_naira: number;
  cartQuantity: number;
};

const PayStack = ({ cartItem, user }: CartItem) => {
  const publicKey = env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const amount = 100000;
  const router = useRouter();

  const componentProps = {
    email: user?.email ?? "",
    amount,
    metadata: {
      name: user?.name ?? "",
      custom_fields: [], // Add the missing custom_fields property
    },
    publicKey,
    text: `Pay with Paystack`,
    onSuccess: () => {
      // Call the API to create the user's subscription

      // Redirect the user to the success page
      router.push("/dashboard/success");
    },
  };

  return (
    <button className="w-full rounded-md bg-primary px-2 py-3 text-center font-bold text-white hover:bg-primaryHover">
      <PaystackButton {...componentProps} publicKey={publicKey ?? ""} />
    </button>
  );
};

export default PayStack;
