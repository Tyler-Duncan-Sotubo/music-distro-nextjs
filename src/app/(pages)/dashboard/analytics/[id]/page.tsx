import React from "react";
import { api } from "@/trpc/server";
import StreamsById from "./StreamsById";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const streamByAudioId = await api.streams.getStreamsByAudioId({
    audioId: params.id,
    timeRange: "7days",
  });

  const audioDetails = await api.streams.getAudioReleases({
    audioId: params.id,
  });

  return (
    <StreamsById
      streamByAudioId={streamByAudioId}
      id={params.id}
      audioDetails={audioDetails}
    />
  );
};

export default page;
