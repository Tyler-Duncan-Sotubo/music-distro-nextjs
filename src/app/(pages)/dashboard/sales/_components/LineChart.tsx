"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

const monthNames: Record<string, string> = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "Aug",
  "09": "Sept",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

const getMonthName = (yearMonth: string): string => {
  const [_, month] = yearMonth.split("-");
  return `${monthNames[month!]}`;
};

// Get the last month in YYYY-MM format
const getLastMonth = (data: Record<string, number>): string => {
  return Object.keys(data).sort().pop()!;
};

// Generate all months for the past 12 months including the last month from data
const generateMonthRange = (lastMonth: string): string[] => {
  const [lastYear, lastMonthNum] = lastMonth.split("-");
  const months = [];

  for (let i = 0; i < 12; i++) {
    const monthNum = ((parseInt(lastMonthNum!) - i + 12) % 12 || 12)
      .toString()
      .padStart(2, "0");
    const year =
      parseInt(lastYear!) - Math.floor((parseInt(lastMonthNum!) - i) / 12);
    months.push(`${year}-${monthNum}`);
  }

  return months.reverse();
};

function calculateTotalEarnings(
  earnings: Record<string, number> | never[],
): number {
  let total = 0;
  for (const month in earnings) {
    if (earnings.hasOwnProperty(month)) {
      total += (earnings as Record<string, number>)[month] ?? 0;
    }
  }
  return total;
}

type MonthlyEarnings = Record<string, number> | never[] | [];

type Props = {
  monthlyEarnings: MonthlyEarnings;
};

const SalesReportLineChart = ({ monthlyEarnings }: Props) => {
  const data: Record<string, number> = monthlyEarnings as Record<
    string,
    number
  >;
  const lastMonth = getLastMonth(data);
  const allMonths = generateMonthRange(lastMonth);

  // Map all months to their corresponding values, defaulting to 0 if not present in data
  const labels = allMonths.map(getMonthName);
  const values = allMonths.map((month) => data[month] ?? 0);

  const totalEarnings = calculateTotalEarnings(monthlyEarnings);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Earnings (£)",
        data: values,
        fill: false,
        backgroundColor: "rgb(0, 71, 171)",
        borderColor: "rgb(0, 71, 171)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="flex flex-col items-center border-b border-gray py-6 lg:flex-row">
      <div className="mx-auto w-full py-6 lg:min-h-[500px] lg:w-2/3">
        <Line data={chartData} options={options} />
      </div>
      <div className="flex flex-col gap-6 text-center lg:w-1/3">
        <div>
          <h3 className="mx-auto mb-1 text-2xl font-semibold">
            Monthly Report
          </h3>
          <h2 className="mx-auto font-bold">£{values[values.length - 1]}</h2>
        </div>
        <div>
          <p className="mx-auto text-lg">Last reporting month</p>
          <h2 className="mx-auto font-bold">{labels[labels.length - 1]}</h2>
        </div>
        <div>
          <h3 className="">Total Earnings</h3>
          <h2 className="mt-4 text-3xl font-bold">£{totalEarnings}</h2>
        </div>
      </div>
    </div>
  );
};

export default SalesReportLineChart;
