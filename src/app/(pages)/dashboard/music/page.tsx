import { type Metadata } from "next";
import { api } from "@/trpc/server";
import RenderArtistMusic from "./RenderArtistMusic";

export const metadata: Metadata = {
  title: "My Music | We Plug Music - Dashboard",
  description:
    "My music upload page where I can upload my music and view my music releases.",
};

const MusicRelease = async () => {
  const musicReleases = await api.audio.getReleases();
  return <RenderArtistMusic musicReleases={musicReleases} />;
};

export default MusicRelease;
