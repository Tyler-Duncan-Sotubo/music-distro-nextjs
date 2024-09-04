import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

type Summary = {
  totalDownloads: number;
  totalStreams: number;
  totalStreamEarnings: number;
  totalDownloadEarnings: number;
  totalEarnings: number;
};

type PlatformSummary = {
  platform: string;
  totalStreams: number;
  totalDownloads: number;
  totalEarnings: number;
};

type CountrySummary = {
  id: string;
  name: string;
  totalStreams: number;
  totalDownloads: number;
  totalEarnings: number;
};

interface AudioEarnings {
  title: string;
  totalStreams: number;
  totalDownloads: number;
  totalEarnings: number;
}

export const reportRouter = createTRPCRouter({
  getTotalEarnings: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;

    const audios = await db.audio.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    // Extract audio IDs
    const audioIds = audios.map((audio) => audio.id);

    if (audioIds.length === 0) {
      return []; // No audio records found for the user
    }

    const earnings = await db.monthlyReport.findMany({
      where: {
        audioId: {
          in: audioIds,
        },
      },
    });

    const totalEarnings = earnings.reduce(
      (acc, report) => {
        acc.totalDownloads += report.downloads;
        acc.totalStreams += report.streams;
        acc.totalStreamEarnings += report.streamEarnings;
        acc.totalDownloadEarnings += report.downloadEarnings;
        acc.totalEarnings += report.streamEarnings + report.downloadEarnings;
        return acc;
      },
      {
        totalDownloads: 0,
        totalStreams: 0,
        totalStreamEarnings: 0,
        totalDownloadEarnings: 0,
        totalEarnings: 0,
      },
    );

    return totalEarnings as Summary;
  }),
  getMonthlyEarnings: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;

    const audios = await db.audio.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    // Extract audio IDs
    const audioIds = audios.map((audio) => audio.id);

    if (audioIds.length === 0) {
      return []; // No audio records found for the user
    }

    const earnings = await db.monthlyReport.findMany({
      where: {
        audioId: {
          in: audioIds,
        },
      },
    });

    // Use Map to accumulate earnings by month
    const monthlyEarningsMap = new Map<string, number>();

    earnings.forEach((earning) => {
      const currentEarnings = monthlyEarningsMap.get(earning.month) ?? 0;
      monthlyEarningsMap.set(
        earning.month,
        currentEarnings + earning.streamEarnings + earning.downloadEarnings,
      );
    });

    // Convert the Map back to a regular object
    const monthlyEarnings = Object.fromEntries(monthlyEarningsMap);

    return monthlyEarnings;
  }),
  getReportByPlatform: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;

    const audios = await db.audio.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    // Extract audio IDs
    const audioIds = audios.map((audio) => audio.id);

    if (audioIds.length === 0) {
      return []; // No audio records found for the user
    }

    const earnings = await db.platformEarnings.findMany({
      where: {
        audioId: {
          in: audioIds,
        },
      },
    });

    const platformSummaryMap = new Map<string, PlatformSummary>();

    earnings.forEach((report) => {
      const { platform, streams, downloads, earnings } = report;

      if (!platformSummaryMap.has(platform)) {
        platformSummaryMap.set(platform, {
          platform,
          totalStreams: 0,
          totalDownloads: 0,
          totalEarnings: 0,
        });
      }

      const summary = platformSummaryMap.get(platform)!;
      summary.totalStreams += streams;
      summary.totalDownloads += downloads;
      summary.totalEarnings += earnings;
    });

    // Convert Map values to an array
    return Array.from(platformSummaryMap.values());
  }),
  getReportByCountry: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;

    const audios = await db.audio.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    // Extract audio IDs
    const audioIds = audios.map((audio) => audio.id);

    if (audioIds.length === 0) {
      return []; // No audio records found for the user
    }

    const earnings = await db.countryEarnings.findMany({
      where: {
        audioId: {
          in: audioIds,
        },
      },
      include: {
        country: {
          select: {
            id: true,
            name: true,
            isoCode: true,
          },
        },
      },
    });

    const countryMap = new Map<string, CountrySummary>();
    earnings.forEach((item) => {
      const { country, streams, streamEarnings, downloads, downloadEarnings } =
        item;

      if (!countryMap.has(country.id)) {
        countryMap.set(country.id, {
          name: country.name,
          id: country.isoCode,
          totalStreams: 0,
          totalDownloads: 0,
          totalEarnings: 0,
        });
      }

      const aggregate = countryMap.get(country.id)!;

      // Update the totals
      aggregate.totalStreams += streams;
      aggregate.totalDownloads += downloads;
      aggregate.totalEarnings += streamEarnings + downloadEarnings; // Update total earnings
    });

    // Convert Map to an array of aggregated data
    return Array.from(countryMap.values());
  }),
  getMonthlyStats: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;

    const audios = await db.audio.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    // Extract audio IDs
    const audioIds = audios.map((audio) => audio.id);

    if (audioIds.length === 0) {
      return []; // No audio records found for the user
    }

    const earnings = await db.monthlyReport.findMany({
      where: {
        audioId: {
          in: audioIds,
        },
      },
    });

    // Use Map to accumulate earnings by month
    const monthlyEarningsMap = new Map<
      string,
      {
        totalEarnings: number;
        streams: number;
        downloads: number;
      }
    >();

    earnings.forEach((earning) => {
      const currentEarnings = monthlyEarningsMap.get(earning.month) ?? {
        totalEarnings: 0,
        streams: 0,
        downloads: 0,
      };

      const newTotalEarnings =
        currentEarnings.totalEarnings +
        earning.streamEarnings +
        earning.downloadEarnings;
      const newStreams = earning.streams;
      const newDownloads = earning.downloads;

      monthlyEarningsMap.set(earning.month, {
        totalEarnings: newTotalEarnings,
        streams: newStreams,
        downloads: newDownloads,
      });
    });

    // Convert the Map back to a regular object
    const monthlyEarnings = Object.fromEntries(monthlyEarningsMap);

    return monthlyEarnings;
  }),
  getTrackStats: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;

    const audios = await db.audio.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    // Extract audio IDs
    const audioIds = audios.map((audio) => audio.id);

    if (audioIds.length === 0) {
      return []; // No audio records found for the user
    }

    const earnings = await db.monthlyReport.findMany({
      where: {
        audioId: {
          in: audioIds,
        },
      },
      include: {
        audio: {
          select: {
            title: true,
          },
        },
      },
    });

    const audioEarningsMap: Record<string, AudioEarnings> = {};

    earnings.forEach((entry) => {
      const {
        audioId,
        audio,
        streams,
        downloads,
        streamEarnings,
        downloadEarnings,
      } = entry;

      if (!audioEarningsMap[audioId]) {
        audioEarningsMap[audioId] = {
          title: audio.title,
          totalStreams: 0,
          totalDownloads: 0,
          totalEarnings: 0,
        };
      }

      audioEarningsMap[audioId].totalStreams += streams;
      audioEarningsMap[audioId].totalDownloads += downloads;
      audioEarningsMap[audioId].totalEarnings +=
        streamEarnings + downloadEarnings;
    });

    // Convert the map to an array
    return Object.values(audioEarningsMap);
  }),
});
