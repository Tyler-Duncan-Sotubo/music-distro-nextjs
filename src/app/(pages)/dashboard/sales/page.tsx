import RenderSalesPage from "./RenderSalesPage";
import RenderSalesDemoPage from "./RenderSalesDemoPage";
import { useFetch } from "@/hooks/fetch";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales and Analytics | We Plug Music - Dashboard",
  description:
    "Sales and analytics page where I can view my sales and analytics data.",
};

const page = async () => {
  const { fetchUserSubscription } = useFetch();
  const userSubscription = await fetchUserSubscription();

  if (userSubscription?.status === "active") {
    return <RenderSalesPage />;
  } else {
    return <RenderSalesDemoPage />;
  }
};

export default page;
