import { type PlatformData } from "../types/streams.types";
import { aggregateDailyData } from "./aggregateDailyData";

// Define color palettes for graphing
const colorPalette: Record<string, string> = {
  "Apple Music": "black",
  Spotify: "#1DB954",
  Facebook: "#1877F2",
  Tiktok: "#ff0050",
  YouTube: "#FF0000",
  Amazon: "purple",
  Soundcloud: "darkOrange",
  // Add more colors as needed
};

const bgColorPalette: Record<string, string> = {
  "Apple Music": "black",
  Spotify: "#1DB954",
  Facebook: "#1877F2",
  Tiktok: "#ff0050",
  YouTube: "#FF0000",
  Amazon: "purple",
  Soundcloud: "darkOrange",
  // Add more colors as needed
};

export const prepareGraphData = (platformData: PlatformData) => {
  const aggregatedData: Record<string, Record<string, number[]>> = {};

  // Aggregate data for each platform
  for (const platform in platformData) {
    if (platformData[platform]) {
      aggregatedData[platform] = aggregateDailyData(platformData[platform]);
    }
  }

  // Collect all unique dates
  const allDates = new Set<string>();
  Object.values(aggregatedData).forEach((data) => {
    Object.keys(data).forEach((dateStr) => {
      allDates.add(dateStr);
    });
  });

  // Convert allDates Set to sorted array of date strings
  const labels = Array.from(allDates).sort((a, b) => {
    const dayOrder = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const dayA = new Date(a).getDay().toString(); // Convert dayA to string
    const dayB = new Date(b).getDay().toString(); // Convert dayB to string
    return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
  });

  // Create datasets for each platform
  const datasets = Object.keys(aggregatedData).map((platform) => {
    const data = labels.map((date) => {
      // Ensure each date is formatted correctly and exists in the data
      const counts = aggregatedData[platform]?.[date] ?? [];
      return counts.reduce((sum, count) => sum + count, 0); // Aggregate counts
    });

    return {
      label: platform,
      data: data,
      fill: false,
      borderColor: colorPalette[platform] ?? "rgba(0, 0, 0, 0.1)",
      backgroundColor: bgColorPalette[platform] ?? "rgba(0, 0, 0, 0.1)",
      tension: 0.3,
      borderWidth: 2,
    };
  });

  return { labels, datasets };
};
