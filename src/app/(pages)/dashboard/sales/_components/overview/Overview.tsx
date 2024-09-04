import { OverviewRow } from "./OverviewRow";
import { formatEarnings } from "../../utils/formatEarningsToTwoDecimal";
import { type Summary } from "../../types/sales.types";

interface PageProps {
  earnings: Summary;
}

const Overview = ({ earnings }: PageProps) => {
  return (
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
          value={earnings.totalDownloads === 0 ? "-" : earnings.totalDownloads}
          formattedValue={formatEarnings(earnings.totalDownloadEarnings)}
        />
        <OverviewRow
          label="Streams"
          value={earnings.totalStreams === 0 ? "-" : earnings.totalStreams}
          formattedValue={formatEarnings(earnings.totalStreamEarnings)}
        />
        <OverviewRow
          label="Total"
          value={earnings.totalStreams + earnings.totalDownloads}
          formattedValue={formatEarnings(earnings.totalEarnings)}
        />
      </tbody>
    </table>
  );
};

export default Overview;
