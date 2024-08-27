import { type TimeRange, type StreamData } from "../types/streams.types";

export const getDayName = (date: Date): string => {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[date.getUTCDay()] ?? ""; // Add a default value of an empty string
};

export const aggregateDailyData = (
  streams: StreamData[],
  timeRange: TimeRange,
) => {
  const dayTotals: Record<string, number[]> = {};

  if (timeRange === "7days") {
    streams.forEach((stream) => {
      const date = new Date(stream.date); // Convert stream date to Date object
      const dayName = getDayName(date); // Get the name of the day

      if (!dayTotals[dayName]) {
        dayTotals[dayName] = []; // Initialize the array if it doesn't exist
      }

      dayTotals[dayName].push(stream.streamCount); // Add the stream count to the array for that day
    });
  } else {
    streams.forEach((stream) => {
      const date: string | undefined = new Date(stream.date)
        .toISOString()
        .split("T")[0]; // Format date as YYYY-MM-DD
      // Initialize the array if it doesn't exist
      if (!dayTotals[date!]) {
        dayTotals[date!] = [];
      }
      if (date && dayTotals[date]) {
        dayTotals[date].push(stream.streamCount); // Add the stream count to the array for that date
      }
    });
  }

  return dayTotals; // Return the aggregated data
};
