"use client";

import { EarningsGraph } from "../graphs/EarningsGraph";
import Link from "next/link";

const RenderSalesDemoPage = () => {
  return (
    <>
      {/* Sales Notice */}
      <h1 className="text-center text-3xl font-bold md:mt-32 md:text-5xl">
        Sales and Streaming Reports
      </h1>
      <h3 className="mb-14 mt-8 text-center">
        Here you&apos;ll find detailed reports on the royalties your music has
        earned. Some stores report sales to us with up to a 3 month delay, so
        you might not see recent earnings reflected in these reports straight
        away.
      </h3>

      {/* Total Earnings Graph */}
      <div className="md:flex md:h-[400px]">
        <div className="md:w-[75%]">
          <EarningsGraph />
        </div>
        <div className="flex flex-col gap-3 text-center capitalize md:w-[25%]">
          <h1 className="mt-20 text-center text-3xl font-bold">
            Monthly Report
          </h1>
          <p className="text-xl">Last reporting months</p>
          <p className="text-center text-2xl font-bold">total earnings</p>
          <p className="text-center text-2xl font-bold"> $0.00</p>
        </div>
      </div>

      <section className="my-28">
        <h1>Overview</h1>
        {/*  Sales Table */}
        <table className="divide-gray-200 my-16 min-w-full divide-y text-[14px] capitalize">
          <thead className="font-regular text-purple bg-white uppercase">
            <tr>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Total Sales</th>
              <th className="p-4 text-left">Total Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y bg-white capitalize">
            {Array.isArray(salesOverview) ? (
              salesOverview.map((release, index) => (
                <tr
                  key={index}
                  className={`${
                    index === salesOverview.length - 1 && "font-bold"
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-5">
                    <p>{release.title}</p>
                  </td>
                  <td className="whitespace-nowrap px-10 py-4">
                    <p>{release.totalEarnings}</p>
                  </td>
                  <td className="whitespace-nowrap px-10 py-4">
                    <p>{release.totalEarnings}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="whitespace-nowrap px-4 py-4 text-center text-xl font-bold">
                  <p>No Release yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default RenderSalesDemoPage;

const salesOverview = [
  {
    title: "Release Downloads",
    totalSales: 0,
    totalEarnings: 0,
  },
  {
    title: "Video Downloads",
    totalSales: 0,
    totalEarnings: 0,
  },
  {
    title: "Track Downloads",
    totalSales: 0,
    totalEarnings: 0,
  },
  {
    title: "Streams",
    totalSales: 0,
    totalEarnings: 0,
  },
  {
    title: "Total",
    totalSales: 0,
    totalEarnings: 0,
  },
];
