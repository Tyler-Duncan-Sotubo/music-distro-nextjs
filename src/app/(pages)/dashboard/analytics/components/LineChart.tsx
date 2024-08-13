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

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default WeeklyStreamChart;
