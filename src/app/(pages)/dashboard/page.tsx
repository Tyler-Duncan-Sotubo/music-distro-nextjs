import RenderDashboard from "./RenderDashboard";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { env } from "@/env";
import { type Audio } from "./types/audio.type";

const fetchAudioReleases = async (userId: string | undefined) => {
  const userAudioReleases = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/audio/${userId}`,
  );
  const userAudioReleasesData = (await userAudioReleases.json()) as Audio[];
  return userAudioReleasesData;
};

const Dashboard = async () => {
  // get user subscription
  const userSubscription = await api.subscriptions.getSubscription();
  const session = await getServerAuthSession();
  const userId = session?.user.id;

  const userAudioReleases = await fetchAudioReleases(userId);

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
