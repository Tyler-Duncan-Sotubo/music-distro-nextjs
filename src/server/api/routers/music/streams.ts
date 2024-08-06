import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { type Stream } from "@/app/(pages)/dashboard/types/stream.type";

export const streamRouter = createTRPCRouter({
  getStreams: protectedProcedure.query(
    async ({ ctx }): Promise<Stream | null> => {
      const { db, session } = ctx;
      const streams = await db.stream.findMany({
        where: {
          userId: session.user.id,
        },
      });

      if (!streams) {
        return null;
      }

      return (streams[0] as unknown as Stream) ?? null;
    },
  ),
});
