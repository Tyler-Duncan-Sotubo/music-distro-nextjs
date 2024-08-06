import React from "react";
import CartPage from "./RenderCartPage";
import { getServerAuthSession } from "@/server/auth";
import { type User } from "next-auth";

const page = async () => {
  const session = await getServerAuthSession();
  const user: User | undefined = session?.user;
  return <CartPage user={user} />;
};

export default page;
