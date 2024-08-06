"use client";

import { TbTriangleInvertedFilled } from "react-icons/tb";
import { StreamsGraph } from "../graphs/StreamsGraph";
import { useState } from "react";
import Link from "next/link";

const RenderAnalyticsDemo = () => {
  const [salesWarningModal, setSalesWarningModal] = useState(true);
  return (
    <>
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
      {/* Streams and Downloads */}
      <section className="text-center my-20">
        <h1 className="my-20">My Streams and Downloads</h1>
        <div className="md:h-[400px] md:flex">
          <div className="md:w-[80%]">
            <StreamsGraph />
          </div>
          <div className="md:w-[25%] text-center flex flex-col gap-3 capitalize">
            <h1 className="text-3xl font-bold text-center mt-20 mb-4">
              Weekly Report
            </h1>
            <div className="text-3xl text-center mb-4">
              <p className="text-lg">Total Streams</p>
              <h4 className="text-3xl font-bold text-center "> 100,000</h4>
            </div>
            <p className="text-lg text-center">vs Previous 7Days</p>
            <div className="flex justify-center items-center gap-2">
              <p className="text-2xl font-bold text-center text-error ">
                - 2.30%
              </p>
              <TbTriangleInvertedFilled className="text-2xl text-error" />
            </div>
          </div>
        </div>
      </section>

      {/* Streaming Platforms */}
      <table className="table-auto md:w-[60%] my-20">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-4 w-[45%] text-left border-gray-400 bg-gray-200 text-gray-800 ">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {streamingValues.map((row, rowIndex) => (
            <tr key={rowIndex} className="mb-4 text-lg">
              <td className=" py-4 flex items-center gap-2">
                <div
                  style={{ backgroundColor: row.color }}
                  className="w-10 h-1"></div>
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
