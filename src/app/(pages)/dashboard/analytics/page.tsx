import RenderAnalyticsPage from "./RenderAnalyticsPage";
import { type Metadata } from "next";
import RenderAnalyticsDemo from "./RenderAnalyticsDemo";
import { api } from "@/trpc/server";

export const metadata: Metadata = {
  title: "Analytics | We Plug Music - Dashboard",
  description:
    "Sales and analytics page where I can view my sales and analytics data.",
};

const page = async () => {
  const userSubscription = await api.subscriptions.getSubscription();
  const streams = await api.streams.getStreams({ timeRange: "7days" });
  const StreamsByCountry = await api.streamsByCountry.getStreamsByCountry();

  const audioStreams = await api.streams.getByAudioStreams();

  if (userSubscription?.status === "active") {
    return (
      <RenderAnalyticsPage
        streams={streams}
        StreamsByCountry={StreamsByCountry}
        audios={audioStreams}
      />
    );
  } else {
    return <RenderAnalyticsDemo />;
  }
};

export default page;
