"use client";

import { OverviewRow } from "./OverviewRow";
import { formatEarnings } from "../../utils/formatEarningsToTwoDecimal";
import { type MonthlyReport } from "../../types/sales.types";
import { Spinner } from "@/components/common/Spinner";
import useFetchReport from "@/hooks/use-fetch-report";

const Monthly = () => {
  const { loading, error, data } = useFetchReport<MonthlyReport>(
    "api/sales-report/month",
  );
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <table className="my-6 min-w-full divide-y divide-gray text-[14px] capitalize">
          <thead className="font-regular bg-white uppercase">
            <tr>
              <th className="p-4 text-left">Month</th>
              <th className="p-4 text-left">Streams</th>
              <th className="hidden p-4 text-left lg:block">Downloads</th>
              <th className="p-4 text-left">Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray bg-white text-left capitalize">
            {Object.entries(data).map(([key, earnings]) => (
              <OverviewRow
                key={key}
                label={earnings.date}
                streams={earnings.streams}
                downloads={
                  earnings.trackDownloads === 0 ? "-" : earnings.trackDownloads
                }
                formattedValue={formatEarnings(earnings.earnings)}
              />
            ))}
          </tbody>
        </table>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default Monthly;
