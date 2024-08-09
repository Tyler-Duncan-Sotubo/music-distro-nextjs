"use client";

import { type Audio } from "@prisma/client";
import React, { useState } from "react";
import MusicReleaseCard from "./MusicReleaseCard";

const MusicReleaseComponent = ({ releases }: { releases: Audio[] | null }) => {
  const isActive = (status: string) => filterStatus === status;
  const [filterStatus, setFilterStatus] = useState("all");

  const ButtonComponent = ({
    status,
    releaseName,
  }: {
    status: string;
    releaseName: string;
  }) => (
    <button
      onClick={() => setFilterStatus(status)}
      className={`mx-5 inline-flex items-center py-2 text-sm font-medium leading-5 text-black transition duration-500 ease-in-out focus:outline-none ${
        isActive(status)
          ? "border-indigo-400 text-gray-900 focus:border-indigo-700 border-b-2 border-primary text-primary"
          : "focus:border-gray-300 focus:text-gray-700 hover:border-b-2 hover:border-primary hover:text-primary"
      }`}
    >
      <p className="md:text-xl">{releaseName}</p>
    </button>
  );

  const filteredReleases = releases?.filter(
    (release) =>
      (release.status.toLowerCase() === "pending" &&
        (filterStatus === "pending" || filterStatus === "all")) ||
      (release.status.toLowerCase() === "live" &&
        (filterStatus === "live" || filterStatus === "all")),
  );

  return (
    <div className="my-6">
      <div className="flex">
        <ButtonComponent status="all" releaseName="All Releases" />
        <ButtonComponent status="pending" releaseName="Pending Releases" />
        <ButtonComponent status="live" releaseName="Live Releases" />
      </div>
      <div className="border-t-2 border-secondary">
        <ul
          className={`${(filteredReleases?.length ?? 0 > 0) ? "grid" : "block"} grid-cols-1 gap-3 md:grid-cols-2 md:gap-10 lg:grid-cols-3`}
        >
          {(filteredReleases?.length ?? 0 > 0) ? (
            filteredReleases?.map((release, index) => (
              <li key={index}>
                <MusicReleaseCard release={release} />
              </li>
            ))
          ) : (
            <p className="my-10 w-full text-center text-2xl">
              No releases available for the selected filter.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MusicReleaseComponent;
