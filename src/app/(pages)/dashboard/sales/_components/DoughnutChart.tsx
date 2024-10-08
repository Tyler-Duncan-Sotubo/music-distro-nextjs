"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { type IStoreReport } from "../_types/sales.types";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Props type
interface Props {
  platformSummaries: IStoreReport[];
}

// DoughnutChart component
const PlatformDoughnutChart = ({ platformSummaries }: Props) => {
  const maxEarnings = Math.max(
    ...platformSummaries.map((summary) => summary.earnings),
  );

  // Function to compute color with opacity
  const getColorWithOpacity = (
    earnings: number,
    maxEarnings: number,
  ): string => {
    // Calculate opacity as a fraction of total earnings
    const opacity = Math.min(0.5 + (earnings / maxEarnings) * 0.5, 1);
    const baseColor = "rgba(0, 71, 171, ";
    const color = baseColor + opacity + ")";
    return color;
  };

  // Prepare chart data
  const labels = platformSummaries.map((summary) => summary.name);
  const backgroundColors = platformSummaries.map((summary) =>
    getColorWithOpacity(summary.earnings, maxEarnings),
  );
  const borderColors = platformSummaries.map((summary) =>
    getColorWithOpacity(summary.earnings, maxEarnings),
  );

  // Chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Earnings",
        data: platformSummaries.map((summary) => summary.earnings),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="flex h-full w-full justify-center px-2 py-4 lg:h-[500px] lg:w-2/3">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default PlatformDoughnutChart;
