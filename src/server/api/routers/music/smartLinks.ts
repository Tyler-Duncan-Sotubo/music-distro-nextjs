import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const smartLinkRouter = createTRPCRouter({
  getAllSmartLinks: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const smartLinks = await db.smartLink.findMany({
      take: 8,
      select: {
        title: true,
        artist: true,
        image: true,
        url: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!smartLinks) {
      return null;
    }

    return smartLinks;
  }),
});
