export type PlatformData = {
  fri: string | number;
  mon: string | number;
  sat: string | number;
  sun: string | number;
  thu: string | number;
  tue: string | number;
  wed: string | number;
  total: string | number;
};

export type Stream = {
  id: string;
  userId: string;
  audioId: string;
  total_streams: number;
  week_start: string;
  week_end: string;
  apple: PlatformData;
  spotify: PlatformData;
  youtube: PlatformData;
  amazon: PlatformData;
  tidal: PlatformData;
  deezer: PlatformData;
  boomPlay: PlatformData;
  tiktok: PlatformData;
  facebook: PlatformData;
  createdAt: string;
};
