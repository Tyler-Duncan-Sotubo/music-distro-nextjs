import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const streamRouter = createTRPCRouter({
  getStreams: protectedProcedure.query(async ({ ctx }) => {
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

    // Calculate the date 7 days ago from today
    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 10);
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);

    const streams = await db.dailyStream.findMany({
      where: {
        audioId: {
          in: audioIds,
        },
        date: {
          gte: tenDaysAgo,
          lt: threeDaysAgo,
        },
      },
      include: {
        platform: {
          select: {
            name: true,
          },
        },
      },
    });

    const formattedData: Record<
      string,
      { date: string; streamCount: number }[]
    > = {};

    streams.forEach((stream) => {
      const platformName = stream.platform.name;
      const dateStr = stream.date?.toISOString().split("T")[0] ?? "";

      if (!formattedData[platformName]) {
        formattedData[platformName] = [];
      }

      formattedData[platformName].push({
        date: dateStr,
        streamCount: stream.streamCount,
      });
    });

    return formattedData;
  }),
  getStreamsTotal: protectedProcedure.query(async ({ ctx }) => {
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

    const streams = await db.dailyStream.findMany({
      where: {
        audioId: {
          in: audioIds,
        },
      },
      include: {
        platform: {
          select: {
            name: true,
          },
        },
      },
    });
    const totalStreamsAcrossAllPlatforms = streams.reduce(
      (sum, stream) => sum + stream.streamCount,
      0,
    );

    return totalStreamsAcrossAllPlatforms;
  }),
  getStreamsByCountry: protectedProcedure.query(async ({ ctx }) => {
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

    const streams = await db.streamByCountry.findMany({
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

    const result = streams.map(
      (item: {
        country: { name: string; isoCode: string };
        streams: number;
      }) => ({
        id: item.country.isoCode,
        name: item.country.name,
        streams: item.streams,
      }),
    );

    return result;
  }),
});
