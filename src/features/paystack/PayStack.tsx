"use client";

import { PaystackButton } from "react-paystack";
import { useRouter } from "next/navigation";
import { type User } from "next-auth";
import { env } from "@/env";
import { type CartType } from "@/hooks/cart";
import { useState, useEffect } from "react";
import { api } from "@/trpc/react";

type cartItem = {
  cartItem: CartType | undefined;
  user: User | undefined;
};

const PayStack = ({ cartItem, user }: cartItem) => {
  const [isMounted, setIsMounted] = useState(false);

  const createSubscription = api.subscriptions.createSubscription.useMutation({
    onSuccess: () => {
      router.push("/dashboard/success");
    },
  });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const publicKey = env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const amount = (cartItem?.price ?? 0) * 100;
  const router = useRouter();

  const componentProps = {
    email: user?.email ?? "",
    amount: amount ?? 0,
    metadata: {
      name: user?.name ?? "",
      custom_fields: [],
    },
    publicKey,
    text: `Pay with Paystack`,
    onSuccess: () => {
      createSubscription.mutate({
        plan: cartItem?.product ?? "",
        productId: cartItem?.productId ?? "",
      });
    },
  };

  return (
    <>
      {isMounted && (
        <button className="w-full rounded-md bg-primary px-2 py-3 text-center font-bold text-white hover:bg-primaryHover">
          <PaystackButton {...componentProps} publicKey={publicKey ?? ""} />
        </button>
      )}
    </>
  );
};

export default PayStack;
