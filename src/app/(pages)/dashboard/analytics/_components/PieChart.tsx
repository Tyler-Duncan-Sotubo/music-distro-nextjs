// src/components/PlatformPieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { prepareGraphData } from "@/app/(pages)/dashboard/analytics/utils/prepareGraphData"; // Adjust path as needed
import { type TimeRange, type PlatformData } from "../types/streams.types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PlatformPieChartProps {
  platformData: PlatformData;
  timeRange: TimeRange;
}

const WeeklyPieChart: React.FC<PlatformPieChartProps> = ({
  platformData,
  timeRange,
}) => {
  const { datasets } = prepareGraphData(platformData, timeRange);

  // Summing up the total streams per platform for the pie chart
  const totalStreams = datasets.map((dataset) => {
    return dataset.data.reduce((acc, value) => acc + value, 0);
  });

  const pieData = {
    labels: datasets.map((dataset) => dataset.label),
    datasets: [
      {
        data: totalStreams,
        backgroundColor: datasets.map((dataset) => dataset.backgroundColor),
        hoverBackgroundColor: datasets.map((dataset) => dataset.borderColor),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Platform Streams Distribution",
      },
    },
  };

  return (
    <div className="mx-auto w-[90%] lg:h-96 lg:w-96">
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default WeeklyPieChart;
