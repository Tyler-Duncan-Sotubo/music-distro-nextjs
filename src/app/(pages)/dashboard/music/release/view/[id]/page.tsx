import React from "react";
import ReleaseOverview from "./ReleaseOverview";
import { env } from "@/env";
import { type AudioRelease } from "../../../types/audio-release.type";

const fetchAudioReleasesById = async (audioId: string) => {
  const audio = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/audio-by-id/${audioId}`,
  );
  const audioData = (await audio.json()) as AudioRelease;
  return audioData;
};

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const release = await fetchAudioReleasesById(params.id);

  return <ReleaseOverview release={release} />;
};

export default page;
