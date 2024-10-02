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
import { type MonthlyReport } from "../types/sales.types";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

// Month name mapping
const monthNames: Record<number, string> = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

// Function to generate last 12 months in "YYYY-MM" format
const generateMonthRange = (
  currentMonth: number,
  currentYear: number,
): string[] => {
  const months = [];
  let month = currentMonth;
  let year = currentYear;

  for (let i = 0; i < 12; i++) {
    months.push(`${year}-${month.toString().padStart(2, "0")}`);
    month--;
    if (month === 0) {
      month = 12;
      year--;
    }
  }

  return months.reverse();
};

// Function to calculate total earnings from monthly reports
function calculateTotalEarnings(monthlyReports: MonthlyReport[]): number {
  return monthlyReports.reduce((total, report) => total + report.earnings, 0);
}

// Component props type
type Props = {
  monthlyReports?: MonthlyReport[];
};

// Main component
const SalesReportLineChart = ({ monthlyReports = [] }: Props) => {
  // Ensure we have data to work with
  if (!monthlyReports || monthlyReports.length === 0) {
    return (
      <div className="flex flex-col items-center border-b border-gray py-6">
        <h3>No data available for the Monthly Report.</h3>
      </div>
    );
  }

  // Sort monthlyReports by year and month in descending order
  const sortedReports = [...monthlyReports].sort((a, b) => {
    if (a.year === b.year) {
      return b.month - a.month; // Sort by month if years are equal
    }
    return b.year - a.year; // Otherwise, sort by year
  });

  // Get the latest report to use as the base for the month range
  const lastReport = sortedReports[0]; // Since we sorted in desc, the latest is now at index 0
  if (!lastReport) {
    return (
      <div className="flex flex-col items-center border-b border-gray py-6">
        <h3>No data available for the Monthly Report.</h3>
      </div>
    );
  }
  const lastYear = lastReport.year;
  const lastMonth = lastReport.month;

  // Generate month range
  const allMonths = generateMonthRange(lastMonth, lastYear);

  // Map months to corresponding earnings
  const labels = allMonths.map((month) => {
    const [year, monthNum] = month.split("-");
    return monthNames[parseInt(monthNum ?? "0", 10)];
  });

  const values = allMonths.map((month) => {
    const report = monthlyReports.find(
      (report) =>
        `${report.year}-${report.month.toString().padStart(2, "0")}` === month,
    );
    return report ? report.earnings : 0;
  });

  const totalEarnings = calculateTotalEarnings(monthlyReports);

  // Chart data
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

  console;

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
      <div className="mx-auto h-[400px] w-full py-6 lg:min-h-[500px] lg:w-2/3">
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
