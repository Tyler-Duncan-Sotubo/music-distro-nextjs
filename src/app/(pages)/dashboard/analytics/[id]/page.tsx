import React from "react";

import StreamsById from "./StreamsById";
import { env } from "@/env";

interface PageProps {
  params: {
    id: string;
  };
}

interface audioDetails {
  title: string;
  releaseCover: string;
}

const fetchAudioReleasesById = async (audioId: string) => {
  const audio = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/audio-by-id/audio/${audioId}`,
  );
  const audioData = (await audio.json()) as audioDetails;
  return audioData;
};

const fetchStreamsByAudioId = async (audioId: string) => {
  const streams = await fetch(
    `${env.NEXT_PUBLIC_BACKEND_URL}/api/streams/${audioId}?timeRange=14days`,
  );
  const streamData = (await streams.json()) as Record<
    string,
    { date: string; total: number }[]
  >;
  return streamData;
};

const page = async ({ params }: PageProps) => {
  const streamByAudioId = await fetchStreamsByAudioId(params.id);
  const audioDetails = await fetchAudioReleasesById(params.id);

  return (
    <StreamsById
      streamByAudioId={streamByAudioId}
      id={params.id}
      audioDetails={audioDetails}
    />
  );
};

export default page;
