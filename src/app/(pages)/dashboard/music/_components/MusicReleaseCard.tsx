import { Audio } from "@prisma/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type ReleaseMobileView = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  release: any;
  description: string;
};

const MobileViewReleaseDetails = ({
  release,
  description,
}: ReleaseMobileView) => (
  <div className="my-2 px-4">
    <h5 className="my-2 font-medium capitalize">{description}</h5>
    <p className="font-bold">{release}</p>
  </div>
);
const MusicReleaseCard = ({ release }: { release: Audio }) => {
  return (
    <div className="my-10 mb-4 flex flex-col rounded-xl bg-white pb-5 shadow-xl">
      <Image
        src={release?.releaseCover ?? ""}
        alt="cover art"
        className="mb-2 object-contain"
        width={500}
        height={400}
      />
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
