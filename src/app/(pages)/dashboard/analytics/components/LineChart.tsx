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
} from "chart.js";
import { prepareGraphData } from "../utils/prepareGraphData";
import { type PlatformData } from "../types/streams.types";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const WeeklyStreamChart: React.FC<{ platformData: PlatformData }> = ({
  platformData,
}) => {
  const graphData = prepareGraphData(platformData);

  const chartData = {
    labels: graphData.labels,
    datasets: graphData.datasets,
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
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
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeeklyStreamChart;
