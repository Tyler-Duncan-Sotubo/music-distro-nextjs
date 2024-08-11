import React from "react";
import { type Track, type Audio } from "@prisma/client";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md";

type TrackListProps = {
  release:
    | ({
        track: Track[] | null;
      } & Audio)
    | null;
};

const TrackListCard = ({ release }: TrackListProps) => {
  console.log(release);
  return (
    <section className="my-16">
      <h1 className="my-2 text-3xl font-bold">TrackList </h1>
      <table className="mb-32 mt-10 min-w-full divide-y divide-gray text-[14px] capitalize">
        <thead className="font-medium uppercase text-black">
          <tr>
            <th className="p-4 text-left capitalize"></th>
            <th className="p-4 text-left capitalize">Title</th>
            <th className="p-4 text-left capitalize">lyrics</th>
            <th className="p-4 text-left capitalize">Producer</th>
            <th className="p-4 text-left capitalize">Release Year</th>
            <th className="p-4 text-left capitalize">ISRC</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray capitalize">
          {release?.track?.map((track: Track, index) => (
            <tr
              key={index}
              className={`font-medium ${index % 2 ? "bg-secondary" : "bg-white"}`}
            >
              <td className="whitespace-nowrap border-b border-gray text-center font-medium">
                {track.trackNumber}
              </td>
              <td className="flex items-center gap-3 whitespace-nowrap border-b border-gray px-4 py-4">
                <p className="w-1/2">
                  {(track?.title?.length ?? 0) > 30
                    ? `${track?.title.slice(0, 30)}...`
                    : track?.title}
                </p>
              </td>
              <td className="whitespace-nowrap border-b border-gray px-4 py-4">
                <p>
                  {!track?.lyrics ? (
                    <MdOutlineCancel />
                  ) : (
                    <MdCheckCircleOutline />
                  )}
                </p>
              </td>
              <td className="whitespace-nowrap border-b border-gray px-4 py-4">
                <p>{track.productionCredit}</p>
              </td>
              <td className="whitespace-nowrap border-b border-gray px-4 py-4">
                <p>{release?.productionYear}</p>
              </td>

              <td className="whitespace-nowrap border-b border-gray px-4 py-4">
                <p>{track?.ISRC === "" ? "N/A" : track?.ISRC}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TrackListCard;
