import RenderMusicReleasePage from "./RenderMusicReleasePage";
import { useFetch } from "@/hooks/fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Music Upload | We Plug Music - Dashboard",
  description:
    "My music upload page where I can upload my music and view my music releases.",
};

const MusicRelease = async () => {
  const { fetchUserSubscription, fetchUser } = useFetch();
  const userSubscription = await fetchUserSubscription();
  const user = await fetchUser();
  return (
    <RenderMusicReleasePage userSubscription={userSubscription} user={user} />
  );
};

export default MusicRelease;
