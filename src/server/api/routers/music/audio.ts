import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const audioRouter = createTRPCRouter({
  getReleases: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const audioReleases = await db.audio.findMany({
      where: {
        userId: session.user.id,
      },
    });

    if (!audioReleases) {
      return null;
    }

    return audioReleases;
  }),
  getAllReleases: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const audioReleases = await db.audio.findMany({
      where: {
        status: "Live",
      },
      orderBy: {
        releaseDate: "desc",
      },
      select: {
        title: true,
        artist: true,
        releaseCover: true,
        smartLink: true,
      },
      take: 8,
    });

    if (!audioReleases) {
      return null;
    }

    return audioReleases;
  }),
  getReleaseById: protectedProcedure
    .input(
      z.object({
        releaseId: z.string().min(1, "Product is required"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const audioRelease = await db.audio.findUnique({
        where: {
          id: input.releaseId,
          userId: session.user.id,
        },
      });

      if (!audioRelease) {
        return null;
      }

      const track = await db.track.findMany({
        where: {
          audioId: audioRelease.id,
        },
        orderBy: {
          trackNumber: "asc",
        },
      });

      return {
        ...audioRelease,
        track,
      };
    }),
});
