import { getServerAuthSession } from "@/server/auth";
import React from "react";
import PaymentPage from "./PayoutPage";
import { fetchRevenue } from "@/hooks/fetch-revenue";

const page = async () => {
  const session = await getServerAuthSession();
  const userId = session?.user.id;

  const revenueData = await fetchRevenue(userId);

  return <PaymentPage payoutAmount={revenueData.earnings} />;
};

export default page;
