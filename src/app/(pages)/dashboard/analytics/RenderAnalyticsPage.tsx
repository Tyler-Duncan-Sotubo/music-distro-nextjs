"use client";

import React from "react";
import WeeklyStreamChart from "./components/LineChart";

// Render component
const RenderAnalyticsPage = ({
  streams,
}: {
  streams: never[] | Record<string, { date: string; streamCount: number }[]>; // Update the type of the streams parameter
}) => {
  // Calculate totals for each platform
  const calculateTotals = (
    data: Record<string, { date: string; streamCount: number }[]>,
  ) => {
    return Object.keys(data).reduce(
      (totals, platform) => {
        const total = (data[platform] ?? []).reduce(
          (sum, record) => sum + record.streamCount,
          0,
        );
        totals[platform] = total;
        return totals;
      },
      {} as Record<string, number>,
    );
  };

  const streamsCopy = streams as Record<
    string,
    { date: string; streamCount: number }[]
  >;

  const calculateGrandTotal = (totals: Record<string, number>) => {
    return Object.values(totals).reduce(
      (grandTotal, total) => grandTotal + total,
      0,
    );
  };

  // Calculate totals
  const totals = calculateTotals(streamsCopy);
  const grandTotal = calculateGrandTotal(totals);

  return (
    <div>
      <>
        {/* Streams and Downloads */}
        <section className="my-20 text-center md:mt-36">
          <div className="my-16">
            <h1 className="">My Streams and Downloads</h1>
            <h3 className="my-4">
              Some stores don’t provide live sales & streaming data, so these
              reports may not reflect your exact final sales figures.
            </h3>
          </div>

          <div className="mb-32 md:flex md:h-[350px]">
            <div className="md:w-[65%]">
              {Object.keys(streams ?? {}).length === 0 ? (
                <section className="relative inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="flex h-[30%] w-full flex-col items-center justify-center gap-6 bg-white px-10 py-6 opacity-70 md:h-[400px]">
                    <WeeklyStreamChart platformData={streamsCopy} />
                    <h3 className="absolute w-2/3 font-bold lg:w-1/2">
                      No downloads reported yet for the last 7 days. Come back
                      later to check again.
                    </h3>
                  </div>
                </section>
              ) : (
                <WeeklyStreamChart platformData={streamsCopy} />
              )}
            </div>

            <div className="flex flex-col gap-3 text-center capitalize md:w-[25%]">
              <h1 className="my-6 text-center text-2xl font-bold">
                Weekly Report
              </h1>
              <div className="mb-4 text-center text-3xl">
                <p className="text-lg">Total Streams</p>
              </div>
              <div className="mb-4 text-center text-3xl">
                <p className="text-lg">This Week</p>
                <h4 className="my-2 text-center text-2xl font-bold">
                  {grandTotal}
                </h4>
              </div>
            </div>
          </div>
        </section>
        {/* Streaming Platforms */}
        {Object.keys(streams ?? {}).length > 0 && (
          <table className="mb-32 w-[60%] min-w-full divide-y divide-gray text-[14px] capitalize">
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
                    <p>{platform}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium">
                    <p>{total}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    </div>
  );
};

export default RenderAnalyticsPage;
