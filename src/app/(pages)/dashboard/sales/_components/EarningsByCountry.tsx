"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  type FeatureCollection,
  type GeoJsonProperties,
  type Geometry,
} from "geojson";
import worldGeography from "@/data/countries.geo.json";
import { formatEarnings } from "../_utils/formatEarningsToTwoDecimal";
import { type ICountryReport } from "../_types/sales.types";

const EarningsByCountryMap = dynamic(() => import("./EarningsByCountryMap"), {
  ssr: false,
});

interface Props {
  earningsByCountry: ICountryReport[];
}

const EarningsByCountry = ({ earningsByCountry }: Props) => {
  const itemsPerPage = 8;
  const sortedData = earningsByCountry
    ?.sort((a, b) => a.earnings - b.earnings)
    .reverse();
  const totalPages = Math.ceil((sortedData?.length ?? 0) / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems =
    earningsByCountry?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    ) ?? [];

  return (
    <section className="border-b border-gray py-6">
      {Object.keys(earningsByCountry ?? {}).length > 0 && (
        <>
          <h2 className="my-6">Streams by Territory </h2>
          <section className="flex flex-col justify-between lg:flex-row lg:gap-10">
            <div className="mx-auto mb-20 w-full text-sm lg:mb-44 lg:w-[40%]">
              <table className="w-full divide-y divide-gray text-sm capitalize">
                <thead className="bg-black font-medium uppercase text-white">
                  <tr>
                    <th className="p-4 text-left capitalize">Country</th>
                    <th className="p-4 text-left capitalize">Streams</th>
                    <th className="hidden p-4 text-left capitalize md:block">
                      Downloads
                    </th>
                    <th className="p-4 text-left capitalize">Earnings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray text-sm capitalize">
                  {currentItems.map((entry, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap border border-gray px-4 py-4 font-medium">
                        <p className="text-sm">
                          {entry.name.length > 20
                            ? entry.name.substring(0, 25)
                            : entry.name}
                        </p>
                      </td>
                      <td className="whitespace-nowrap border border-gray px-4 py-4 font-medium">
                        <p className="text-sm">{entry.streams}</p>
                      </td>
                      <td className="hidden whitespace-nowrap border-b border-gray px-4 py-4 font-medium md:block">
                        <p className="text-sm">{entry.trackDownloads}</p>
                      </td>
                      <td className="whitespace-nowrap border border-gray px-4 py-4 font-medium">
                        <p className="text-sm">
                          {formatEarnings(entry.earnings)}
                        </p>
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
                      className={`border border-gray px-3 py-1 ${currentPage === index + 1 ? "bg-black text-white" : "bg-white text-black"}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:w-[60%]">
              {typeof window !== "undefined" && (
                <EarningsByCountryMap
                  data={earningsByCountry}
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
    </section>
  );
};

export default EarningsByCountry;
