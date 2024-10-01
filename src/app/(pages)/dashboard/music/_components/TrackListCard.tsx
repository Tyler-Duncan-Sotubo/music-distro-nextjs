import React from "react";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md";
import { type AudioRelease } from "../types/audio-release.type";

type TrackListProps = {
  release: AudioRelease;
};

const TrackListCard = ({ release }: TrackListProps) => {
  return (
    <section>
      <section className="my-16 hidden lg:block">
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
            {release?.Track?.map((track, index) => (
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
      <section className="my-16 lg:hidden">
        <h1 className="my-2 text-3xl font-bold">TrackList </h1>
        <table className="mb-32 mt-10 min-w-full divide-y divide-gray text-[14px] capitalize">
          <thead className="font-medium uppercase text-black">
            <tr>
              <th className="p-4 text-left capitalize"></th>
              <th className="p-4 text-left capitalize">Title</th>
              <th className="p-4 text-left capitalize">ISRC</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray text-[.8rem] capitalize">
            {release?.Track?.map((track, index) => (
              <tr
                key={index}
                className={`font-medium ${index % 2 ? "bg-secondary" : "bg-white"}`}
              >
                <td className="whitespace-nowrap border-b border-gray text-center font-medium">
                  <p className="text-[.8rem]">{track.trackNumber}</p>
                </td>
                <td className="flex items-center gap-3 whitespace-nowrap border-b border-gray px-4 py-4">
                  <p className="w-1/2 text-[.9rem]">
                    {(track?.title?.length ?? 0) > 30
                      ? `${track?.title.slice(0, 30)}...`
                      : track?.title}
                  </p>
                </td>
                <td className="whitespace-nowrap border-b border-gray px-4 py-4">
                  <p className="text-[.8rem]">
                    {track?.ISRC === "" ? "N/A" : track?.ISRC}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default TrackListCard;
