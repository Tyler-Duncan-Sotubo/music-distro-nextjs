import { type StreamData } from "../types/streams.types";

export const getDayName = (date: Date): string => {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[date.getUTCDay()] ?? ""; // Add a default value of an empty string
};

export const aggregateDailyData = (streams: StreamData[]) => {
  const dayTotals: Record<string, number[]> = {};

  streams.forEach((stream) => {
    const date = new Date(stream.date); // Convert stream date to Date object
    const dayName = getDayName(date); // Get the name of the day

    if (!dayTotals[dayName]) {
      dayTotals[dayName] = []; // Initialize the array if it doesn't exist
    }

    dayTotals[dayName].push(stream.streamCount); // Add the stream count to the array for that day
  });

  return dayTotals; // Return the aggregated data
};
