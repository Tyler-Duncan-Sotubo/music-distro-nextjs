import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { prepareGraphData } from "@/app/(pages)/dashboard/analytics/utils/prepareGraphData";
import { type PlatformData, type TimeRange } from "../types/streams.types";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const formatDate = (date: string): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, month, day] = date.split("-").map(Number);
  console.log({ year, month, day });
  return month ? `${months[month - 1]} ${day}` : "";
};

// Function to check if a date string is in the format YYYY-MM-DD
const isValidDateFormat = (date: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
};

const WeeklyStreamChart: React.FC<{
  platformData: PlatformData;
  timeRange: TimeRange;
}> = ({ platformData, timeRange }) => {
  const graphData = prepareGraphData(platformData, timeRange);

  const chartData = {
    labels: graphData.labels.map((label) =>
      isValidDateFormat(label) ? formatDate(label) : label,
    ),
    datasets: graphData.datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="min-h-96 min-w-96">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeeklyStreamChart;
