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
          userId: "66467ddf83bc10188ef2e695",
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
  getAudioReleases: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const audioReleases = await db.audio.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (!audioReleases) {
      return null;
    }

    return audioReleases;
  }),
  getStreamsByAudioId: protectedProcedure
    .input(
      z.object({
        audioId: z.string().min(1, "Audio Id is required"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const streams = await db.dailyStream.findMany({
        where: {
          audioId: input.audioId,
          AND: [
            { date: { gte: tenDaysAgo.toISOString() } }, // greater than or equal to tenDaysAgo
            { date: { lte: threeDaysAgo.toISOString() } }, // less than or equal to sevenDaysAgo
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
});
