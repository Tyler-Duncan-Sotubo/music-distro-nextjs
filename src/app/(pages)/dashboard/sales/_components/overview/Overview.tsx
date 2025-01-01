"use client";

import { OverviewRow } from "./OverviewRow";
import { formatEarnings } from "../../_utils/formatEarningsToTwoDecimal";
import { type MonthlyReport } from "../../_types/sales.types";
import useFetchApiData from "@/hooks/use-fetch-api-data";

// Function to calculate total earnings, downloads, streams, and sales
export function calculateTotals(monthlyReports: MonthlyReport[]) {
  return monthlyReports.reduce(
    (totals, { trackDownloads, streams, totalSales, earnings }) => ({
      totalDownloads: totals.totalDownloads + trackDownloads,
      totalStreams: totals.totalStreams + streams,
      totalSales: totals.totalSales + totalSales,
      totalEarnings: totals.totalEarnings + earnings,
    }),
    {
      totalDownloads: 0,
      totalStreams: 0,
      totalSales: 0,
      totalEarnings: 0,
    },
  );
}

const Overview = () => {
  const { error, data } = useFetchApiData<MonthlyReport>(
    "api/sales-report/month",
  );

  const { totalDownloads, totalStreams, totalSales, totalEarnings } =
    calculateTotals(data);

  return (
    <>
      <table className="my-6 min-w-full divide-y divide-gray text-[14px] capitalize">
        <thead className="font-regular bg-white uppercase">
          <tr>
            <th className="p-4 text-left"></th>
            <th className="p-4 text-left">Streams</th>
            <th className="hidden p-4 text-left lg:block">Downloads</th>
            <th className="p-4 text-left">Total Sales</th>
            <th className="p-4 text-left">Earnings</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray bg-white text-left capitalize">
          <OverviewRow
            label="Total"
            streams={totalStreams}
            downloads={totalDownloads === 0 ? "-" : totalDownloads}
            formattedValue={formatEarnings(totalEarnings)}
            value={totalSales}
          />
        </tbody>
      </table>
      {error && <p>{error}</p>}
    </>
  );
};

export default Overview;
