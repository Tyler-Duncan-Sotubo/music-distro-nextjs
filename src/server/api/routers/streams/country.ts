import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const streamsByCountryRouter = createTRPCRouter({
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
