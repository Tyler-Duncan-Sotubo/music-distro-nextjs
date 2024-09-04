import { OverviewRow } from "./OverviewRow";
import { formatEarnings } from "../../utils/formatEarningsToTwoDecimal";
import { formatMonthYear } from "../../utils/formatMonthYear";

type EarningsData = Record<
  string,
  {
    streams: number;
    downloads: number;
    totalEarnings: number;
  }
>;

interface Props {
  monthlyStats: EarningsData | never[];
}

const Monthly = ({ monthlyStats }: Props) => {
  return (
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
        {Object.entries(monthlyStats).map(([monthYear, earnings]) => (
          <OverviewRow
            key={monthYear}
            label={formatMonthYear(monthYear)}
            streams={earnings.streams}
            downloads={earnings.downloads === 0 ? "-" : earnings.downloads}
            formattedValue={formatEarnings(earnings.totalEarnings)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Monthly;
