// Interface for the performance metrics of streaming platforms or countries
interface PerformanceMetrics {
  trackDownloads: number; // Total number of track downloads
  streams: number; // Total number of streams
  totalSales: number; // Total sales
  earnings: number; // Total earnings
}

interface DateMetrics {
  date: string; // Date of the report
  year: number; // Year of the report
  month: number; // Month of the report
}

// Interface for the monthly report
interface MonthlyReport extends PerformanceMetrics, DateMetrics {
  // You can add additional properties specific to MonthlyReport if needed
}

interface IStoreReport extends PerformanceMetrics {
  name: string;
}

interface ICountryReport extends PerformanceMetrics {
  name: string;
  id: string;
}

export const fetchMonthlyReports = async (userId: string | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sales-report/month/${userId}?timeRange=7days`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch streams by audio ID");
  }

  const monthlySalesReport = (await response.json()) as MonthlyReport[];

  return monthlySalesReport;
};

export const fetchReportByStore = async (userId: string | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sales-report/store/${userId}?timeRange=7days`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch streams by audio ID");
  }

  const reportByStore = (await response.json()) as IStoreReport[];

  return reportByStore;
};

export const fetchReportByCountry = async (userId: string | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sales-report/country/${userId}?timeRange=7days`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch streams by audio ID");
  }

  const reportByStore = (await response.json()) as ICountryReport[];

  return reportByStore;
};
