import React from "react";
import CartPage from "./RenderCartPage";
import { getServerAuthSession } from "@/server/auth";
import { type User } from "next-auth";
import { api } from "@/trpc/server";

const page = async () => {
  const session = await getServerAuthSession();
  const user: User | undefined = session?.user;

  const cartItems = await api.cart.getCartItem();

  return <CartPage user={user} cartItem={cartItems} />;
};

export default page;
