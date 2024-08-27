"use client";

import { useState } from "react";
import {
  type FeatureCollection,
  type GeoJsonProperties,
  type Geometry,
} from "geojson";

import dynamic from "next/dynamic";
import worldGeography from "@/data/countries.geo.json";

const StreamsByCountryMap = dynamic(
  () => import("../components/StreamsByCountryMap"),
  {
    ssr: false,
  },
);

interface StreamData {
  id: string;
  name: string;
  streams: number;
}

type StreamCountryProps = {
  StreamsByCountry: StreamData[] | undefined;
};

const StreamCountry = ({ StreamsByCountry }: StreamCountryProps) => {
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
    <>
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
    </>
  );
};

export default StreamCountry;
