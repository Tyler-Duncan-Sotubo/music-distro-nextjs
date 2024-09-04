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
