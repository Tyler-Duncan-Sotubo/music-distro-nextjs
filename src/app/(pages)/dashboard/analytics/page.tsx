import RenderAnalyticsPage from "./RenderAnalyticsPage";
import { type Metadata } from "next";
import RenderAnalyticsDemo from "./RenderAnalyticsDemo";
import { api } from "@/trpc/server";
import { type Stream } from "../types/stream.type";

export const metadata: Metadata = {
  title: "Analytics | We Plug Music - Dashboard",
  description:
    "Sales and analytics page where I can view my sales and analytics data.",
};

const page = async () => {
  const userSubscription = await api.subscriptions.getSubscription();
  const streams: Stream | undefined | null = await api.streams.getStreams();

  if (userSubscription?.status === "active") {
    return <RenderAnalyticsPage streams={streams} />;
  } else {
    return <RenderAnalyticsDemo />;
  }
};

export default page;
