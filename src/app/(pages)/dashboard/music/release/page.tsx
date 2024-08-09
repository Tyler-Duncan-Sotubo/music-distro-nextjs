import RenderMusicReleasePage from "./RenderMusicReleasePage";
import { type Metadata } from "next";
import { api } from "@/trpc/server";

export const metadata: Metadata = {
  title: "My Music Upload | We Plug Music - Dashboard",
  description:
    "My music upload page where I can upload my music and view my music releases.",
};

const MusicRelease = async () => {
  const userSubscription = await api.subscriptions.getSubscription();
  return <RenderMusicReleasePage userSubscription={userSubscription} />;
};

export default MusicRelease;
