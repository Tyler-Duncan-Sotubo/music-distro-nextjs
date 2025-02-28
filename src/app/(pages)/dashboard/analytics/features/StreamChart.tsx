"use client";

import WeeklyStreamChart from "../_components/LineChart";
import WeeklyPieChart from "../_components/PieChart";
import { type TimeRange } from "../types/streams.types";

type StreamProps = {
  streams: Record<string, { date: string; total: number }[]> | never[];
  timeRange: TimeRange;
};

const StreamChart = ({ streams, timeRange }: StreamProps) => {
  const streamsData = streams as Record<
    string,
    { date: string; total: number }[]
  >;

  const totals = calculateTotals(streamsData);
  const grandTotal = calculateGrandTotal(totals);

  return (
    <>
      <SectionChart
        streamsData={streamsData}
        timeRange={timeRange}
        grandTotal={grandTotal}
      />
      <DspSection
        streamsData={streamsData}
        totals={totals}
        timeRange={timeRange}
      />
    </>
  );
};

const calculateTotals = (
  data: Record<string, { date: string; total: number }[]>,
) => {
  return Object.keys(data).reduce(
    (totals, platform) => {
      const total = (data[platform] ?? []).reduce(
        (sum, record) => sum + record.total,
        0,
      );
      totals[platform] = total;
      return totals;
    },
    {} as Record<string, number>,
  );
};

const calculateGrandTotal = (totals: Record<string, number>) => {
  return Object.values(totals).reduce(
    (grandTotal, total) => grandTotal + total,
    0,
  );
};

const SectionChart = ({
  streamsData,
  timeRange,
  grandTotal,
}: {
  streamsData: Record<string, { date: string; total: number }[]>;
  timeRange: TimeRange;
  grandTotal: number;
}) => (
  <section className="my-8">
    <div className="mb-44 h-[500px] gap-20 lg:mb-32 lg:flex lg:h-[350px]">
      <div className="relative lg:w-[65%]">
        {Object.keys(streamsData).length === 0 ? (
          <NoDataSection />
        ) : (
          <WeeklyStreamChart platformData={streamsData} timeRange={timeRange} />
        )}
      </div>
      <SummaryCard timeRange={timeRange} grandTotal={grandTotal} />
    </div>
  </section>
);

const NoDataSection = () => (
  <section className="relative inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="flex h-[200px] w-full flex-col items-center justify-center gap-6 bg-white px-10 py-6 opacity-70 md:h-[400px]">
      <WeeklyStreamChart platformData={{}} timeRange="7days" />
      <h3 className="absolute w-2/3 font-bold lg:w-1/2">
        No downloads reported yet for the last 7 days. Come back later to check
        again.
      </h3>
    </div>
  </section>
);

const SummaryCard = ({
  timeRange,
  grandTotal,
}: {
  timeRange: TimeRange;
  grandTotal: number;
}) => (
  <div className="flex flex-col gap-3 border-gray text-center capitalize lg:w-[25%] lg:border-l">
    <h1 className="my-6 text-center text-2xl font-bold">
      {timeRange === "7days"
        ? "Weekly Report"
        : timeRange === "14days"
          ? "Fortnightly Report"
          : "Monthly Report"}
    </h1>
    <div className="mb-4 text-center text-3xl">
      <p className="text-lg">Total streams</p>
      <h4 className="my-2 text-center text-2xl font-bold">{grandTotal}</h4>
    </div>
  </div>
);

const DspSection = ({
  streamsData,
  totals,
  timeRange,
}: {
  streamsData: Record<string, { date: string; total: number }[]>;
  totals: Record<string, number>;
  timeRange: TimeRange;
}) => (
  <section className="flex flex-col justify-between lg:flex-row lg:gap-10">
    <div className="lg:w-1/2">
      {Object.keys(streamsData).length > 0 && <DspTable totals={totals} />}
    </div>
    {Object.keys(streamsData).length > 0 && (
      <WeeklyPieChart platformData={streamsData} timeRange={timeRange} />
    )}
  </section>
);

const DspTable = ({ totals }: { totals: Record<string, number> }) => (
  <table className="mb-12 w-[60%] min-w-full divide-y divide-gray text-[14px] capitalize">
    <thead className="bg-black font-medium uppercase text-white">
      <tr>
        <th className="p-4 text-left capitalize">Store</th>
        <th className="p-4 text-left capitalize">Streams</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray capitalize">
      {Object.entries(totals).map(([platform, total]) => (
        <tr key={platform}>
          <td className="whitespace-nowrap px-4 py-4 font-medium">
            {platform}
          </td>
          <td className="whitespace-nowrap px-4 py-4 font-medium">{total}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default StreamChart;
