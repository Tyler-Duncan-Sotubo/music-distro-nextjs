"use client";

import { OverviewRow } from "./OverviewRow";
import { formatEarnings } from "../../utils/formatEarningsToTwoDecimal";
import { type MonthlyReport } from "../../types/sales.types";
import useFetchReport from "@/hooks/use-fetch-report";

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
  const { error, data } = useFetchReport<MonthlyReport>(
    "api/sales-report/month",
  );

  const { totalDownloads, totalStreams, totalSales, totalEarnings } =
    calculateTotals(data);

  return (
    <>
      <table className="my-6 min-w-full divide-y divide-gray text-[14px] capitalize">
        <thead className="font-regular bg-white text-sm uppercase">
          <tr>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Total Sales</th>
            <th className="p-4 text-left">Total Earnings</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray bg-white capitalize">
          <OverviewRow
            label="Downloads"
            value={totalDownloads === 0 ? "-" : totalDownloads}
            formattedValue={formatEarnings(totalDownloads)}
          />
          <OverviewRow
            label="Streams"
            value={totalStreams === 0 ? "-" : totalStreams}
            formattedValue={formatEarnings(totalEarnings)}
          />
          <OverviewRow
            label="Total"
            value={totalSales}
            formattedValue={formatEarnings(totalEarnings)}
          />
        </tbody>
      </table>
      {error && <p>{error}</p>}
    </>
  );
};

export default Overview;
