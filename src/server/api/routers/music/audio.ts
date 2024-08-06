import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
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
});
