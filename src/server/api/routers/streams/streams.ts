import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

// Calculate the date 7 days ago from today
const today = new Date();
const tenDaysAgo = new Date(today);
tenDaysAgo.setDate(today.getDate() - 10);
const threeDaysAgo = new Date(today);
threeDaysAgo.setDate(today.getDate() - 3);

export const streamsRouter = createTRPCRouter({
  getStreams: protectedProcedure
    .input(
      z.object({
        timeRange: z.enum(["7days", "14days", "30days", "all"]), // Define allowed time ranges
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { timeRange } = input;

      // Determine the date range based on the selected timeRange
      const now = new Date();
      let startDate;
      switch (timeRange) {
        case "7days":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 10);
          break;
        case "14days":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 17);
          break;
        case "30days":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 33);
          break;
        case "all":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 365);
          break;
        default:
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 365);
      }

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
          AND: [
            { date: { gte: startDate.toISOString() } }, // greater than or equal to startDate
            { date: { lte: threeDaysAgo.toISOString() } }, // less than or equal to the current date
          ],
        },
        distinct: ["date", "audioId", "platformId"], // Ensure uniqueness based on these fields
        orderBy: {
          date: "asc",
        },
        include: {
          Audio: {
            select: {
              id: true,
            },
          },
          platform: {
            select: {
              name: true,
            },
          },
        },
      });

      const formattedData: Record<
        string,
        { date: string; streamCount: number; audioId: string }[]
      > = {};

      streams.forEach((stream) => {
        const platformName = stream.platform.name;
        const audioId = stream.Audio.id;
        const dateStr = stream.date?.toISOString().split("T")[0] ?? "";

        if (!formattedData[platformName]) {
          formattedData[platformName] = [];
        }

        formattedData[platformName].push({
          audioId: audioId,
          date: dateStr,
          streamCount: stream.streamCount,
        });
      });
      return formattedData;
    }),
  getAudioReleases: protectedProcedure
    .input(
      z.object({
        audioId: z.string().min(1, "Audio Id is required"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const audioReleases = await db.audio.findUnique({
        where: {
          id: input.audioId,
        },
        select: {
          title: true,
          releaseCover: true,
        },
      });

      if (!audioReleases) {
        return null;
      }
      return audioReleases;
    }),

  // Get streams by audioId
  getStreamsByAudioId: protectedProcedure
    .input(
      z.object({
        audioId: z.string().min(1, "Audio Id is required"),
        timeRange: z.enum(["7days", "14days", "30days", "all"]), // Define allowed time ranges
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { timeRange } = input;
      // Determine the date range based on the selected timeRange
      const now = new Date();
      let startDate;
      switch (timeRange) {
        case "7days":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 10);
          break;
        case "14days":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 17);
          break;
        case "30days":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 33);
          break;
        case "all":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 365);
          break;
        default:
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 365);
      }

      const streams = await db.dailyStream.findMany({
        where: {
          audioId: input.audioId,
          AND: [
            { date: { gte: startDate.toISOString() } }, // greater than or equal to startDate
            { date: { lte: threeDaysAgo.toISOString() } }, // less than or equal to the current date
          ],
        },
        distinct: ["date", "audioId", "platformId"], // Ensure uniqueness based on these fields
        orderBy: {
          date: "asc",
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
  getByAudioStreams: protectedProcedure.query(async ({ ctx, input }) => {
    const { db, session } = ctx;
    // Fetch audio records for the user
    const audios = await db.audio.findMany({
      where: {
        userId: session.user.id, // Replace with dynamic session userId if needed
      },
      select: {
        id: true,
        title: true,
        releaseCover: true,
      },
    });

    const audioMap = audios.reduce(
      (map, audio) => {
        map[audio.id] = { title: audio.title, cover: audio.releaseCover }; // Map audioId to title and cover
        return map;
      },
      {} as Record<string, { title: string; cover: string }>,
    );

    const audioIds = audios.map((audio) => audio.id);

    if (audioIds.length === 0) {
      return []; // No audio records found for the user
    }

    // Query for streams within the specified date range
    const streams = await db.dailyStream.findMany({
      where: {
        audioId: {
          in: audioIds,
        },
      },
      distinct: ["date", "audioId", "platformId"], // Ensure uniqueness based on these fields
      orderBy: {
        date: "asc",
      },
      include: {
        Audio: {
          select: {
            id: true,
            title: true,
          },
        },
        platform: {
          select: {
            name: true,
          },
        },
      },
    });

    // Object to store the total streams per audioId with titles and cover
    const totalStreamsByAudioId: Record<
      string,
      { title: string; totalStreams: number; cover: string }
    > = {};

    streams.forEach((stream) => {
      const audioId = stream.Audio.id;
      const streamCount = stream.streamCount;

      if (!totalStreamsByAudioId[audioId]) {
        totalStreamsByAudioId[audioId] = {
          title: audioMap[audioId]?.title ?? "",
          cover: audioMap[audioId]?.cover ?? "", // Add the cover to the object
          totalStreams: 0,
        };
      }
      totalStreamsByAudioId[audioId].totalStreams += streamCount;
    });

    return totalStreamsByAudioId;
  }),
});
