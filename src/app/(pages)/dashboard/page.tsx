import RenderDashboard from "./RenderDashboard";
import { api } from "@/trpc/server";

const Dashboard = async () => {
  // get user subscription

  const userSubscription = await api.subscriptions.getSubscription();
  const userAudioReleases = await api.audio.getReleases();

  return (
    <>
      <RenderDashboard
        userSubscription={userSubscription}
        userAudioReleases={userAudioReleases}
      />
    </>
  );
};

export default Dashboard;
