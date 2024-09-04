import RenderSalesPage from "./RenderSalesPage";
import RenderSalesDemoPage from "./RenderSalesDemoPage";
import { api } from "@/trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales and Analytics | We Plug Music - Dashboard",
  description:
    "Sales and analytics page where I can view my sales and analytics data.",
};

const page = async () => {
  const userSubscription = await api.subscriptions.getSubscription();
  const earnings = await api.report.getTotalEarnings();
  if (userSubscription?.status === "active" && earnings) {
    return <RenderSalesPage />;
  } else {
    return <RenderSalesDemoPage />;
  }
};

export default page;
