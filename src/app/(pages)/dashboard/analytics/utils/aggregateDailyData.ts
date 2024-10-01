import { type TimeRange, type StreamData } from "../types/streams.types"; // Import types for better type safety

// Function to get the name of the day from a Date object
export const getDayName = (date: Date): string => {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[date.getUTCDay()] ?? ""; // Add a default value of an empty string
};

// Function to aggregate daily data
export const aggregateDailyData = (
  streams: StreamData[],
  timeRange: TimeRange,
) => {
  const dayTotals: Record<string, number[]> = {};

  // Aggregate based on the time range
  if (timeRange === "7days") {
    streams.forEach((stream) => {
      const date = new Date(stream.date); // Convert stream date to Date object
      const dayName = getDayName(date); // Get the name of the day

      if (!dayTotals[dayName]) {
        dayTotals[dayName] = []; // Initialize the array if it doesn't exist
      }

      dayTotals[dayName].push(stream.total); // Use 'total' instead of 'streamCount'
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
        dayTotals[date].push(stream.total); // Use 'total' instead of 'streamCount'
      }
    });
  }

  return dayTotals; // Return the aggregated data
};
