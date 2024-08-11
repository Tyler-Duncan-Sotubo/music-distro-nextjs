import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  releaseDate: z.string().min(1, "Release Date is required"),
  primaryGenre: z.string().min(1, "Genre is required"),
  secondaryGenre: z.string().min(1, "Genre is required"),
  lyrics: z.string().optional(),
  label: z.string().min(1, "Label is required"),
  productionHolder: z.string().min(1, "Production Holder is required"),
  productionYear: z.string().min(1, "Production Year is required"),
  copyrightHolder: z.string().min(1, "copyright Holder is required"),
  copyrightYear: z.string().min(1, "copyright Year is required"),
  language: z.string().min(1, "Language is required"),
  releaseAudioLink: z.string().optional(),
  imageFileName: z.string().min(1, "Image is required"),
  audioFileName: z.string().nullable(),
  releaseCover: z.string(),
  releaseAudio: z.string().optional().nullable(),
});

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
      });

      return {
        ...audioRelease,
        track,
      };
    }),
});
