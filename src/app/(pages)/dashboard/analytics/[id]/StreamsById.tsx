"use client";

import StreamChart from "../features/StreamChart";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import axios from "@/libs/axios";

interface PageProps {
  streamByAudioId: Record<string, { date: string; total: number }[]>;
  audioDetails: { title: string; releaseCover: string } | null;
  id: string;
}
type TimeRange = "7days" | "14days" | "30days";
const StreamsById = ({ streamByAudioId, id, audioDetails }: PageProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("14days"); // Default to 14 days
  const [streams, setStreams] = useState<
    Record<string, { date: string; total: number }[]>
  >({});

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = e.target.value as TimeRange;
    setTimeRange(selectedRange);
  };

  const fetchStreamData = async (timeRange: string) => {
    setError("");

    try {
      const res = await axios.get(`/api/streams/${id}?timeRange=${timeRange}`); // Fetch data from the server
      setStreams(res.data as Record<string, { date: string; total: number }[]>); // Set the response data
    } catch (err) {
      setError("Error"); // Handle error
    }
  };

  useEffect(() => {
    void fetchStreamData(timeRange); // Fetch data whenever timeRange changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  let audioStreams;
  // Switch based on the presence of data
  switch (true) {
    case !!streams: // Check if updateStreams is truthy
      audioStreams = streams;
      break;
    default: // Fallback to streams if neither is truthy
      audioStreams = streamByAudioId;
  }

  return (
    <div className="my-20 md:mt-36">
      <div>
        <Button>
          <a href="/dashboard/analytics">Back</a>
        </Button>
        <div className="my-8 flex gap-4">
          <Image
            src={audioDetails?.releaseCover ?? "/default-cover.png"}
            alt="cover"
            width={100}
            height={100}
          />
          <h3 className="my-4 text-2xl font-bold"> {audioDetails?.title} </h3>
        </div>
      </div>
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
        <StreamChart streams={audioStreams} timeRange={timeRange} audios={[]} />
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default StreamsById;
