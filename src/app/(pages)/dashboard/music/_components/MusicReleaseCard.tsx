import { type Audio } from "@prisma/client";
import React from "react";
import Image from "next/image";

type ReleaseMobileView = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  release: any;
  description: string;
};

const MobileViewReleaseDetails = ({
  release,
  description,
}: ReleaseMobileView) => (
  <div className="my-2 px-4 text-sm">
    <h5 className="my-2 font-light capitalize">{description}</h5>
    <p className="font-bold">
      {typeof release === "string" ? release.substring(0, 30) + "..." : release}
    </p>
  </div>
);
const MusicReleaseCard = ({ release }: { release: Audio }) => {
  return (
    <div className="my-10 mb-4 flex flex-col rounded-xl bg-white pb-5 shadow-xl">
      <div className="relative h-60 w-full">
        <Image
          fill
          src={release?.releaseCover ?? ""}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="release image"
        />
      </div>
      <div className="flex flex-col capitalize">
        <MobileViewReleaseDetails
          release={release?.title}
          description="song title"
        />
        <MobileViewReleaseDetails
          release={release?.releaseDate?.getFullYear()}
          description="Release Year"
        />
      </div>
    </div>
  );
};

export default MusicReleaseCard;
