import { type PlatformData, type TimeRange } from "../types/streams.types";
import { aggregateDailyData } from "./aggregateDailyData";

// Define color palettes for graphing
const colorPalette: Record<string, string> = {
  "Apple Music": "rgb(0,0,0)",
  Spotify: "rgb(8, 161, 61)",
  Facebook: "rgb(24, 119, 242)",
  Tiktok: "rgb(255, 165, 0)",
  YouTube: "rgb(255, 0, 0)",
  Amazon: "purple",
  Soundcloud: "darkOrange",
  // Add more colors as needed
};

const bgColorPalette: Record<string, string> = {
  "Apple Music": "rgba(0,0,0, 0.3)",
  Spotify: " rgba(119, 213, 152,0.3)",
  Facebook: "rgba(24, 119, 242, 0.3)",
  Tiktok: "rgba(255, 165, 0, 0.3)",
  YouTube: "rgba(255, 0, 0, 0.3)",
  Amazon: "purple",
  Soundcloud: "darkOrange",
  // Add more colors as needed
};

export const prepareGraphData = (
  platformData: PlatformData,
  timeRange: TimeRange, // Add timeRange parameter
) => {
  const aggregatedData: Record<string, Record<string, number[]>> = {};
  // Get the current date and calculate the start date based on the selected time range
  const currentDate = new Date();
  const startDate = new Date();
  switch (timeRange) {
    case "7days":
      startDate.setDate(currentDate.getDate() - 10);
      break;
    case "14days":
      startDate.setDate(currentDate.getDate() - 17);
      break;
    case "30days":
      startDate.setDate(currentDate.getDate() - 33);
      break;
    case "all":
      startDate.setDate(currentDate.getDate() - 365);
      break;
    default:
      startDate.setDate(currentDate.getDate() - 10);
  }

  // Aggregate data for each platform
  for (const platform in platformData) {
    if (platformData[platform]) {
      // Filter the data within the selected time range
      const filteredData = platformData[platform].filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= currentDate;
      });
      aggregatedData[platform] = aggregateDailyData(filteredData, timeRange); // Use aggregateDailyData function
    }
  }

  // Get all unique dates from the aggregated data
  const allDates = new Set<string>();
  Object.values(aggregatedData).forEach((data) => {
    Object.keys(data).forEach((dateStr) => {
      allDates.add(dateStr);
    });
  });

  // Convert allDates Set to sorted array of date strings
  const labels = Array.from(allDates).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

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
      fill: true,
      borderColor: colorPalette[platform] ?? "rgba(0, 0, 0, 0.1)",
      backgroundColor: bgColorPalette[platform] ?? "rgba(0, 0, 0, 0.1)",
      tension: 0.3,
      borderWidth: 2,
    };
  });

  return { labels, datasets };
};
