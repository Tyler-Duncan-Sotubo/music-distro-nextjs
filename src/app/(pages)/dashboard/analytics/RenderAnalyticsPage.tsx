"use client";

import StreamChart from "./features/StreamChart";
import StreamCountry from "./features/StreamCountry";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "@/libs/axios";
import { Spinner } from "@/components/common/Spinner";

interface StreamData {
  id: string;
  name: string;
  streams: number;
}

type PageProps = {
  streamByUserId: never[] | Record<string, { date: string; total: number }[]>; // Update the type of the streams parameter
  StreamsByCountry: StreamData[] | undefined;
  audios:
    | never[]
    | Record<string, { title: string; totalStreams: number; cover: string }>;
};

type TimeRange = "7days" | "14days" | "30days";

const RenderAnalyticsPage = ({
  streamByUserId,
  StreamsByCountry,
  audios,
}: PageProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("14days"); // Default to 7 days
  const [streams, setStreams] = useState<
    Record<string, { date: string; total: number }[]>
  >(Array.isArray(streamByUserId) ? {} : streamByUserId);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null); // For selected track
  const [loading, setLoading] = useState(false); // Loading state for UI feedback
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession(); // Get the user's session

  // Fetch stream data with proper API call
  const fetchStreamData = async (timeRange: string, trackId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = trackId
        ? `/api/streams/${trackId}?timeRange=${timeRange}` // API call for selected track
        : `/api/all-streams/${session?.user.id}?timeRange=${timeRange}`; // Default API call for all streams
      const res = await axios.get(url);

      setStreams(res.data as Record<string, { date: string; total: number }[]>); // Set the response data
    } catch (err) {
      setError("Error fetching streams"); // Handle error
    } finally {
      setLoading(false); // Stop loading after the request
    }
  };

  // Handle time range changes
  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value as TimeRange); // Update time range state
  };

  // Handle track selection changes
  const handleTrackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const trackId = e.target.value || null; // Capture the selected track ID
    setSelectedTrackId(trackId); // Update selected track ID
  };

  // Trigger fetching stream data when either timeRange or selectedTrackId changes
  useEffect(() => {
    if (session?.user.id) {
      void fetchStreamData(timeRange, selectedTrackId ?? undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange, selectedTrackId, session?.user.id]); // Re-fetch data when time range or track selection changes

  console.log(streams);
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
        <div className="flex flex-col justify-between gap-5 px-5 md:w-2/3 md:flex-row">
          <div className="flex w-full items-center gap-2 md:flex-row">
            {/* Track selection */}
            {audios &&
              Object.keys(audios).length > 1 && ( // Check if there are more than 1 audio tracks
                <>
                  <h3 className="text-lg font-bold">By:</h3>
                  <select
                    id="trackSelection"
                    name="trackSelection"
                    value={selectedTrackId ?? ""}
                    onChange={handleTrackChange} // Track change handler
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full self-end rounded-md border bg-white p-2 shadow-sm focus:outline-none sm:text-sm md:w-[35%]"
                  >
                    <option value="">Track</option>
                    {Object.entries(audios)
                      .sort(([, a], [, b]) => b.totalStreams - a.totalStreams) // Sort by totalStreams in descending order
                      .map(([id, audio]) => (
                        <option key={id} value={id}>
                          {audio.title}
                        </option>
                      ))}
                  </select>
                </>
              )}
          </div>
          {/* Time range selection */}
          <select
            id="timeRange"
            name="timeRange"
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full self-end rounded-md border bg-white p-2 shadow-sm focus:outline-none sm:text-sm md:w-[25%]"
          >
            <option value="7days">Last 7 Days</option>
            <option value="14days">Last 14 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Error display */}
        {error && <div className="text-red-500">{error}</div>}

        {/* Loading state */}
        {loading ? (
          <Spinner />
        ) : (
          // Streams by DSPs Chart Component
          <StreamChart streams={streams} timeRange={timeRange} />
        )}
      </div>

      {/* Streams by Country */}
      <StreamCountry StreamsByCountry={StreamsByCountry} />
    </div>
  );
};

export default RenderAnalyticsPage;
