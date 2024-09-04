import React from "react";
import { TrackStats } from "../../types/sales.types";
import { OverviewRow } from "./OverviewRow";
import { formatEarnings } from "../../utils/formatEarningsToTwoDecimal";

interface Props {
  trackStats: TrackStats[];
}

const TrackOverview = ({ trackStats }: Props) => {
  return (
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
        {trackStats.map(
          ({ title, totalStreams, totalDownloads, totalEarnings }) => (
            <OverviewRow
              key={title}
              label={title}
              streams={totalStreams}
              downloads={totalDownloads === 0 ? "-" : totalDownloads}
              formattedValue={formatEarnings(totalEarnings)}
            />
          ),
        )}
      </tbody>
    </table>
  );
};

export default TrackOverview;
