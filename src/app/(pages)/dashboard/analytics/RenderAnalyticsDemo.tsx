"use client";

import { TbTriangleInvertedFilled } from "react-icons/tb";
import { StreamsGraph } from "../graphs/StreamsGraph";
import { useState } from "react";
import Link from "next/link";

const RenderAnalyticsDemo = () => {
  const salesWarningModal = true;
  return (
    <>
      {salesWarningModal && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="flex h-[30%] w-[80%] flex-col items-center justify-center gap-6 rounded-2xl bg-white px-10 py-6 md:h-[30%] md:w-[40%]">
            <h3 className="text-center text-lg">
              You are currently on a demo account. To view your sales and
              analytics data, please subscribe to a plan.
            </h3>
            <Link href="/dashboard/subscription">
              <button className="w-full bg-primary px-3 py-4 text-center text-white">
                Subscribe To A Plan
              </button>
            </Link>
          </div>
        </section>
      )}
      {/* Streams and Downloads */}
      <section className="my-20 text-center">
        <h1 className="my-20">My Streams and Downloads</h1>
        <div className="md:flex md:h-[400px]">
          <div className="md:w-[80%]">
            <StreamsGraph />
          </div>
          <div className="flex flex-col gap-3 text-center capitalize md:w-[25%]">
            <h1 className="mb-4 mt-20 text-center text-3xl font-bold">
              Weekly Report
            </h1>
            <div className="mb-4 text-center text-3xl">
              <p className="text-lg">Total Streams</p>
              <h4 className="text-center text-3xl font-bold"> 100,000</h4>
            </div>
            <p className="text-center text-lg">vs Previous 7Days</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-center text-2xl font-bold text-error">
                - 2.30%
              </p>
              <TbTriangleInvertedFilled className="text-2xl text-error" />
            </div>
          </div>
        </div>
      </section>

      {/* Streaming Platforms */}
      <table className="my-20 table-auto md:w-[60%]">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-gray-400 bg-gray-200 text-gray-800 w-[45%] py-4 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {streamingValues.map((row, rowIndex) => (
            <tr key={rowIndex} className="mb-4 text-lg">
              <td className="flex items-center gap-2 py-4">
                <div
                  style={{ backgroundColor: row.color }}
                  className="h-1 w-10"
                ></div>
                {row.name}
              </td>
              <td className="py-4 text-xl">{row.this_week}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RenderAnalyticsDemo;

const streamingValues = [
  {
    color: "blue",
    name: "Apple Music",
    this_week: "15,000",
    last_week: "20,000",
  },
  {
    color: "red",
    name: "Spotify",
    this_week: "10,000",
    last_week: "5,000",
  },
  {
    color: "green",
    name: "Deezer",
    this_week: "20,000",
    last_week: "15,000",
  },
  {
    color: "yellow",
    name: "Tidal",
    this_week: "5,000",
    last_week: "10,000",
  },
  {
    color: "purple",
    name: "YouTube",
    this_week: "30,000",
    last_week: "25,000",
  },
  {
    color: "orange",
    name: "Others",
    this_week: "10,000",
    last_week: "5,000",
  },
];

const headers = ["Store", "Stream"];
