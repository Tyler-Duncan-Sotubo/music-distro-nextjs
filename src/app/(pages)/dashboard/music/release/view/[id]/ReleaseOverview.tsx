import { type Track, type Audio } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ReleaseStatus from "@/app/(pages)/dashboard/music/_components/ReleaseStatus";
import TrackListCard from "../../../_components/TrackListCard";

type ReleaseOverviewProps = {
  release:
    | ({
        track: Track[] | null;
      } & Audio)
    | null;
};

const RenderReleaseDetailsText = ({
  title,
  value,
}: {
  title: string;
  value: string | undefined;
}) => {
  return (
    <div className="flex">
      <p className="w-1/2">{title}:</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
};

const ReleaseOverview = ({ release }: ReleaseOverviewProps) => {
  return (
    <>
      {/* Release Status*/}
      <ReleaseStatus status={release?.status.toLowerCase()} />
      {/* Release Overview */}
      <section className="mb-10">
        <h1 className="my-10 text-3xl font-bold">Release Overview</h1>
        <div className="py-10 shadow-2xl">
          <div className="flex flex-col-reverse items-center justify-center gap-10 md:flex-row-reverse">
            <div className="md:w-2/3">
              <h1 className="text-2xl font-bold capitalize">
                {release?.title}
              </h1>
              <div className="my-10 grid grid-rows-2 gap-2 lg:grid-cols-2">
                <RenderReleaseDetailsText
                  title="Primary Genre"
                  value={release?.primaryGenre}
                />
                <RenderReleaseDetailsText
                  title="Secondary Genre"
                  value={release?.secondaryGenre}
                />
                <RenderReleaseDetailsText
                  title="Label"
                  value={release?.label}
                />
                <RenderReleaseDetailsText
                  title="Production Holder"
                  value={release?.productionHolder}
                />
                <RenderReleaseDetailsText
                  title="Production Year"
                  value={release?.productionYear}
                />
                <RenderReleaseDetailsText
                  title="Language"
                  value={release?.language}
                />
                <RenderReleaseDetailsText
                  title="Lyrics"
                  value={release?.lyrics ?? ""}
                />
                <RenderReleaseDetailsText
                  title="Release Audio Link"
                  value={release?.releaseAudioLink ?? ""}
                />
                <RenderReleaseDetailsText
                  title="Release Date"
                  value={release?.releaseDate?.toDateString().slice(0, 20)}
                />
                <RenderReleaseDetailsText title="UPC" value={release?.UPC} />

                <RenderReleaseDetailsText
                  title="Copyright Holder"
                  value={release?.copyrightHolder}
                />
                <RenderReleaseDetailsText
                  title="Copyright Year"
                  value={release?.copyrightYear}
                />
              </div>
            </div>
            <div className="relative mb-10 h-80 w-[85%] lg:w-1/4">
              <Image
                src={release?.releaseCover ?? ""}
                alt="cover art"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Release TrackList */}
      <TrackListCard release={release} />
    </>
  );
};

export default ReleaseOverview;
