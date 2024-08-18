"use client";

import {
  type FeatureCollection,
  type GeoJsonProperties,
  type Geometry,
} from "geojson";
import WeeklyStreamChart from "./components/LineChart";
import WeeklyPieChart from "./components/PieChart";
import worldGeography from "@/data/countries.geo.json";
import dynamic from "next/dynamic";
import { useState } from "react";

const StreamsByCountryMap = dynamic(
  () => import("./components/StreamsByCountryMap"),
  {
    ssr: false,
  },
);

type PageProps = {
  streams: never[] | Record<string, { date: string; streamCount: number }[]>; // Update the type of the streams parameter
  totalStreams: number | never[];
  StreamsByCountry: StreamData[] | undefined;
};

interface StreamData {
  id: string;
  name: string;
  streams: number;
}

const RenderAnalyticsPage = ({
  streams,
  totalStreams,
  StreamsByCountry,
}: PageProps) => {
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

  // Pagination
  const itemsPerPage = 8;
  const sortedData = StreamsByCountry?.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const totalPages = Math.ceil((sortedData?.length ?? 0) / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems =
    StreamsByCountry?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    ) ?? [];

  return (
    <div>
      {/* Streams and Downloads */}
      <section className="my-20 text-center md:mt-36">
        <div className="my-16">
          <h1 className="">My Streams and Downloads</h1>
          <h3 className="my-4">
            Some stores don’t provide live sales & streaming data, so these
            reports may not reflect your exact final sales figures.
          </h3>
        </div>

        <div className="mb-44 h-[500px] lg:mb-32 lg:flex lg:h-[350px]">
          <div className="relative lg:w-[65%]">
            {Object.keys(streams ?? {}).length === 0 ? (
              <section className="relative inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="flex h-[200px] w-full flex-col items-center justify-center gap-6 bg-white px-10 py-6 opacity-70 md:h-[400px]">
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

          <div className="flex flex-col gap-3 text-center capitalize lg:w-[25%]">
            <h1 className="my-6 text-center text-2xl font-bold">
              Weekly Report
            </h1>
            <div className="mb-1 text-center text-3xl">
              <p className="text-lg">Total Streams</p>
              <h4 className="my-2 text-center text-2xl font-bold">
                {totalStreams}
              </h4>
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

      {/* Stream by DSPs*/}

      <section className="flex flex-col justify-between lg:flex-row lg:gap-10">
        <div className="lg:w-1/2">
          {Object.keys(streams ?? {}).length > 0 && (
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
        </div>
        <div className="mb-44 lg:w-1/3">
          {Object.keys(streams ?? {}).length > 0 && (
            <WeeklyPieChart platformData={streamsCopy} />
          )}
        </div>
      </section>

      {/* Streams by Territory */}

      {Object.keys(StreamsByCountry ?? {}).length > 0 && (
        <>
          <h2 className="my-6">Streams by Territory </h2>
          <section className="flex flex-col justify-between lg:flex-row lg:gap-10">
            <div className="mb-20 lg:mb-44 lg:w-1/3">
              <table className="min-w-full divide-y divide-gray text-[14px] capitalize">
                <thead className="bg-black font-medium uppercase text-white">
                  <tr>
                    <th className="p-4 text-left capitalize">Country</th>
                    <th className="p-4 text-left capitalize">Streams</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray capitalize">
                  {currentItems.map((entry, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-4 font-medium">
                        <p>{entry.name}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-medium">
                        <p>{entry.streams}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-2 flex justify-center space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`border px-3 py-1 ${currentPage === index + 1 ? "bg-black text-white" : "bg-white text-black"}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-44 lg:w-2/3">
              {typeof window !== "undefined" && (
                <StreamsByCountryMap
                  data={StreamsByCountry}
                  geography={
                    worldGeography as FeatureCollection<
                      Geometry,
                      GeoJsonProperties
                    >
                  }
                />
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default RenderAnalyticsPage;
