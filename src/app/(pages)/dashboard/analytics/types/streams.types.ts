export interface StreamData {
  date: string; // ISO date string
  streamCount: number;
  downloadCount?: number; // Optional
}

export type PlatformData = Record<string, StreamData[]>;
export type TimeRange = "7days" | "14days" | "30days" | "all";
