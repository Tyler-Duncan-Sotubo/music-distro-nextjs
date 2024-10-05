import RenderSalesPage from "./RenderSalesPage";
import RenderSalesDemoPage from "./RenderSalesDemoPage";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import { getServerAuthSession } from "@/server/auth";
import { fetchMonthlyReports } from "@/hooks/fetch-sales-report";
import { type MonthlyReport } from "./_types/sales.types";

export const metadata: Metadata = {
  title: "Sales and Analytics | We Plug Music - Dashboard",
  description:
    "Sales and analytics page where I can view my sales and analytics data.",
};

const page = async () => {
  const session = await getServerAuthSession();
  const userId = session?.user.id;
  const monthlySalesReports = (await fetchMonthlyReports(
    userId,
  )) as MonthlyReport[];
  const userSubscription = await api.subscriptions.getSubscription();

  if (userSubscription?.status === "active" && monthlySalesReports.length > 0) {
    return <RenderSalesPage />;
  } else {
    return <RenderSalesDemoPage />;
  }
};

export default page;
