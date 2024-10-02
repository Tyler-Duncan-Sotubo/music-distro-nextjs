"use client";

import React from "react";
import { OverviewRow } from "./OverviewRow";
import { formatEarnings } from "../../utils/formatEarningsToTwoDecimal";
import { Spinner } from "@/components/common/Spinner";
import useFetchReport from "@/hooks/use-fetch-report";

interface TrackReport {
  trackDownloads: number;
  streams: number;
  earnings: number;
  title: string;
}

const TrackOverview = () => {
  const { loading, error, data } = useFetchReport<TrackReport>(
    "api/sales-report/track",
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <table className="my-6 min-w-full divide-y divide-gray text-[14px] capitalize">
          <thead className="font-regular bg-white uppercase">
            <tr>
              <th className="p-4 text-left">Track</th>
              <th className="p-4 text-left">Streams</th>
              <th className="hidden p-4 text-left lg:block">Downloads</th>
              <th className="p-4 text-left">Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray bg-white text-left capitalize">
            {data.map(({ title, streams, trackDownloads, earnings }) => (
              <OverviewRow
                key={title}
                label={title}
                streams={streams}
                downloads={trackDownloads === 0 ? "-" : trackDownloads}
                formattedValue={formatEarnings(earnings)}
              />
            ))}
          </tbody>
        </table>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default TrackOverview;
