import RenderAnalyticsPage from "./RenderAnalyticsPage";
import { type Metadata } from "next";
import RenderAnalyticsDemo from "./RenderAnalyticsDemo";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import {
  fetchAllStreamsCountry,
  fetchByAudioStreams,
  fetchStreamsByAudioId,
} from "@/hooks/fetchStreams";

export const metadata: Metadata = {
  title: "Analytics | We Plug Music - Dashboard",
  description:
    "Sales and analytics page where I can view my sales and analytics data.",
};

const page = async () => {
  // Get the user's subscription status
  const userSubscription = await api.subscriptions.getSubscription();

  // Get the user's streams by Audio
  const session = await getServerAuthSession();
  const userId = session?.user?.id;
  const streamByUserId = await fetchStreamsByAudioId(userId);

  // Get stream total by Audio Id
  const audioStreams = await fetchByAudioStreams(userId);

  const StreamsByCountry = await fetchAllStreamsCountry(userId);

  if (userSubscription?.status === "active") {
    return (
      <RenderAnalyticsPage
        streamByUserId={streamByUserId}
        StreamsByCountry={StreamsByCountry}
        audios={audioStreams}
      />
    );
  } else {
    return <RenderAnalyticsDemo />;
  }
};

export default page;
