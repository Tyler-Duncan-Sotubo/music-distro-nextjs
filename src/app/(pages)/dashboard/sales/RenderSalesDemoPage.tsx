"use client";

import { useState } from "react";
import { EarningsGraph } from "../graphs/EarningsGraph";
import Link from "next/link";

const RenderSalesDemoPage = () => {
  // Check if user is subscribed
  const [salesWarningModal, setSalesWarningModal] = useState(true);

  return (
    <>
      {/* Sales Warning Modal */}
      {salesWarningModal && (
        <section className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center ">
          <div className="bg-white px-10 flex flex-col gap-6 justify-center items-center py-6 w-[80%] h-[30%] md:w-[40%] md:h-[30%] rounded-2xl">
            <h3 className="text-lg text-center">
              You are currently on a demo account. To view your sales and
              analytics data, please subscribe to a plan.
            </h3>
            <Link href="/dashboard/subscription">
              <button className="px-3 py-4 w-full text-center text-white bg-primary">
                Subscribe To A Plan
              </button>
            </Link>
          </div>
        </section>
      )}
      {/* Sales Notice */}
      <h1 className="text-center text-3xl md:text-5xl font-bold md:mt-32">
        Sales and Streaming Reports
      </h1>
      <h3 className="text-center mb-14 mt-8">
        Here you&apos;ll find detailed reports on the royalties your music has
        earned. Some stores report sales to us with up to a 3 month delay, so
        you might not see recent earnings reflected in these reports straight
        away.
      </h3>

      {/* Total Earnings Graph */}
      <div className="md:h-[400px] md:flex">
        <div className="md:w-[75%]">
          <EarningsGraph />
        </div>
        <div className="md:w-[25%] text-center flex flex-col gap-3 capitalize">
          <h1 className="text-3xl font-bold text-center mt-20">
            Monthly Report
          </h1>
          <p className="text-xl">Last reporting months</p>
          <p className="text-2xl font-bold text-center ">total earnings</p>
          <p className="text-2xl font-bold text-center "> $0.00</p>
        </div>
      </div>

      <section className="my-28">
        <h1>Overview</h1>
        {/*  Sales Table */}
        <table className="min-w-full divide-y divide-gray-200 text-[14px] capitalize my-16">
          <thead className="font-regular bg-white uppercase text-purple ">
            <tr>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Total Sales</th>
              <th className="text-left p-4">Total Earnings</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 capitalize">
            {Array.isArray(salesOverview) ? (
              salesOverview.map((release, index) => (
                <tr
                  key={index}
                  className={`${
                    index === salesOverview.length - 1 && "font-bold"
                  }`}>
                  <td className="px-4 py-5 whitespace-nowrap">
                    <p>{release.title}</p>
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    <p>{release.totalEarnings}</p>
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    <p>{release.totalEarnings}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-4 text-xl whitespace-nowrap font-bold text-center">
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
