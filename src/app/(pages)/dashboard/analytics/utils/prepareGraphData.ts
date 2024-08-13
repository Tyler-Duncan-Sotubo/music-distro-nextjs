import { type PlatformData } from "../types/streams.types";
import { aggregateDailyData } from "./aggregateDailyData";

const colorPalette: Record<string, string> = {
  "Apple Music": "black",
  Spotify: "green",
  Facebook: "lightBlue",
  // Add more colors as needed
};

const bgColorPalette: Record<string, string> = {
  "Apple Music": "black",
  Spotify: "green",
  Facebook: "lightBlue",
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

  // Collect all unique days of the week
  const allDays = new Set<string>();
  Object.values(aggregatedData).forEach((data) => {
    Object.keys(data).forEach((day) => allDays.add(day));
  });

  // Sort days and create labels
  const daysOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const labels = daysOrder.filter((day) => allDays.has(day));

  // Create datasets for each platform
  const datasets = Object.keys(aggregatedData).map((platform) => {
    const data = labels.map((day) => aggregatedData[platform]?.[day] ?? []);

    return {
      label: platform,
      data: data.map((counts) => counts.reduce((sum, count) => sum + count, 0)),
      fill: false,
      borderColor: colorPalette[platform] ?? "rgba(0, 0, 0, 0.1)",
      backgroundColor: bgColorPalette[platform] ?? "rgba(0, 0, 0, 0.1)",
      tension: 0.3,
      borderWidth: 2,
    };
  });

  return { labels, datasets };
};
