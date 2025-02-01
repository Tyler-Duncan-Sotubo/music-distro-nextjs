import React from "react";
import CartPage from "./RenderCartPage";
import { getServerAuthSession } from "@/server/auth";
import { type User } from "next-auth";
import { fetchCartItems } from "@/hooks/cart";

const page = async () => {
  const session = await getServerAuthSession();
  const user: User | undefined = session?.user;

  const cartItems = await fetchCartItems(session!.user.id);
  return <CartPage user={user} cartItem={cartItems} />;
};

export default page;
