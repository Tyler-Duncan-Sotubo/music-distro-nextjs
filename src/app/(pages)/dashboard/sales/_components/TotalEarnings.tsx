import { type MonthlyReport } from "../types/sales.types";

type CardProps = {
  title: string;
  primaryValue?: number | string; // Optional primary value
  secondaryValue: string | number;
  streams?: string; // Optional streams description
  sign?: string; // Optional sign (for currency or unit)
};

const Card: React.FC<CardProps> = ({
  title,
  primaryValue,
  secondaryValue,
  streams = "",
  sign = "",
}) => (
  <div className="border border-gray px-4 py-6 shadow-xl">
    <div className="flex justify-between">
      <h4 className="mb-4 text-xl">{title}</h4>
      {streams && <h4 className="mb-4 text-xl">{streams}</h4>}
    </div>
    <div className="flex justify-between">
      {primaryValue !== undefined && (
        <h2 className="text-xl font-medium">{primaryValue.toLocaleString()}</h2>
      )}
      <h2 className="text-right text-2xl font-bold">
        {sign}
        {secondaryValue.toLocaleString()}
      </h2>
    </div>
  </div>
);

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

interface PageProps {
  earnings: MonthlyReport[];
}

const TotalEarnings: React.FC<PageProps> = ({ earnings }) => {
  const { totalDownloads, totalStreams, totalSales, totalEarnings } =
    calculateTotals(earnings);

  return (
    <section className="mx-auto my-10 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      <Card
        title="Downloads"
        primaryValue={totalDownloads}
        secondaryValue={totalStreams}
        streams="Streams"
      />
      <Card title="Total Sales" secondaryValue={totalSales} />
      <Card
        title="Total Earnings"
        secondaryValue={totalEarnings}
        sign="£" // Pound sign for earnings
      />
    </section>
  );
};

export default TotalEarnings;
