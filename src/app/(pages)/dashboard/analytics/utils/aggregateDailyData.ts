import { type StreamData } from "../types/streams.types";

const getDayName = (date: Date): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()] ?? ""; // Add a default value of an empty string
};

export const aggregateDailyData = (streams: StreamData[]) => {
  const dayTotals: Record<string, number[]> = {};

  streams.forEach((stream) => {
    const date = new Date(stream.date);
    const dayName = getDayName(date);

    if (!dayTotals[dayName]) {
      dayTotals[dayName] = [];
    }

    dayTotals[dayName].push(stream.streamCount); // Store each stream count in an array
  });

  return dayTotals;
};
