import React from "react";
import { api } from "@/trpc/server";
import ReleaseOverview from "./ReleaseOverview";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const release = await api.audio.getReleaseById({
    releaseId: params.id,
  });

  return <ReleaseOverview release={release} />;
};

export default page;
