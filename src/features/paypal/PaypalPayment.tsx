"use client";

import {
  PayPalButtons,
  FUNDING,
  type PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import axios from "@/libs/axios";
import { useState } from "react";
import { type User } from "next-auth";
import { type CartItem } from "@prisma/client";
import { api } from "@/trpc/react";
import { type CartType } from "@/hooks/cart";

type cartItem = {
  user: User | undefined;
  cartItem: CartType | undefined;
};

interface OrderData {
  id: string;
  details?: Array<{
    issue: string;
    description: string;
  }>;
  debug_id?: string;
}

const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const PaypalPayment = ({ cartItem, user }: cartItem) => {
  // router
  const router = useRouter();
  const [paymentError, setPaymentError] = useState<string>("");

  const createSubscription = api.subscriptions.createSubscription.useMutation({
    onSuccess: () => {
      router.push("/dashboard/success");
    },
  });

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    try {
      const response = await fetch(
        `${serverURL}/api/payment/paypal/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: cartItem?.product,
            price: Number(cartItem?.price),
            description: cartItem?.description,
            customerID: user?.name,
          }),
        },
      );

      const orderData: OrderData = (await response.json()) as OrderData;

      if (!orderData.id) {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : "Unexpected error occurred, please try again.";

        throw new Error(errorMessage);
      }

      return orderData.id;
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : String(error));
      throw error;
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    try {
      const res = await fetch(
        `${serverURL}/api/payment/paypal/capture-transaction`,
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            orderID: data.orderID,
          }),
        },
      );

      const result = (await res.json()) as { status: string };
      if (result.status === "COMPLETED") {
        createSubscription.mutate({
          plan: cartItem?.product ?? "",
          productId: cartItem?.productId ?? "",
        });
        router.push("/dashboard/success");
      }
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : String(error));
      throw error;
    }
  };

  return (
    <>
      <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        fundingSource={FUNDING.PAYPAL}
      />
    </>
  );
};

export default PaypalPayment;
