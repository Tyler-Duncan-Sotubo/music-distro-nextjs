export type Summary = {
  totalDownloads: number;
  totalStreams: number;
  totalStreamEarnings: number;
  totalDownloadEarnings: number;
  totalEarnings: number;
};

export interface OverviewRowProps {
  label: string;
  value: number;
  formattedValue: string;
}

export type MonthlyEarnings = Record<string, number> | never[] | [];

export type MonthlyStatsProps = Record<
  string,
  {
    streams: number;
    downloads: number;
    totalEarnings: number;
  }
>;

export type TrackStats = {
  title: string;
  totalStreams: number;
  totalDownloads: number;
  totalEarnings: number;
};

// Interface for the performance metrics of streaming platforms or countries
export interface PerformanceMetrics {
  trackDownloads: number; // Total number of track downloads
  streams: number; // Total number of streams
  totalSales: number; // Total sales
  earnings: number; // Total earnings
}

export interface DateMetrics {
  date: string; // Date of the report
  year: number; // Year of the report
  month: number; // Month of the report
}

// Interface for the monthly report
export interface MonthlyReport extends PerformanceMetrics, DateMetrics {
  // You can add additional properties specific to MonthlyReport if needed
}
export interface IStoreReport extends PerformanceMetrics {
  name: string;
}

export interface ICountryReport extends PerformanceMetrics {
  name: string;
  id: string;
}
