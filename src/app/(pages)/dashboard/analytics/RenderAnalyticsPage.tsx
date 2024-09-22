"use client";

import StreamChart from "./features/StreamChart";
import StreamCountry from "./features/StreamCountry";
import { useState } from "react";
import { api } from "@/trpc/react";

interface StreamData {
  id: string;
  name: string;
  streams: number;
}

interface Audios {
  id: string;
  title: string;
}

type PageProps = {
  streams: never[] | Record<string, { date: string; streamCount: number }[]>; // Update the type of the streams parameter
  StreamsByCountry: StreamData[] | undefined;
  audios: Audios[] | null;
};

type TimeRange = "7days" | "14days" | "30days";

const RenderAnalyticsPage = ({
  streams,
  StreamsByCountry,
  audios,
}: PageProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("14days"); // Default to 14 days

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = e.target.value as TimeRange;
    setTimeRange(selectedRange);
  };

  const updateStreams = api.streams.getStreams.useQuery({
    timeRange: timeRange,
  }).data;

  let audioStreams;
  // Switch based on the presence of data
  switch (true) {
    case !!updateStreams: // Check if updateStreams is truthy
      audioStreams = updateStreams;
      break;
    default: // Fallback to streams if neither is truthy
      audioStreams = streams;
  }

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
      </section>

      <div>
        <div className="flex justify-end px-10 md:w-2/3">
          <select
            id="timeRange"
            name="timeRange"
            value={timeRange}
            onChange={handleChange}
            className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full self-end rounded-md border bg-white p-2 shadow-sm focus:outline-none sm:text-sm md:w-[25%]"
          >
            <option value="7days">Last 7 Days</option>
            <option value="14days">Last 14 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
        {/* Streams by DSPs */}
        <StreamChart
          streams={audioStreams}
          timeRange={timeRange}
          audios={audios}
        />
      </div>

      {/* Streams by Country */}
      <StreamCountry StreamsByCountry={StreamsByCountry} />
    </div>
  );
};

export default RenderAnalyticsPage;
