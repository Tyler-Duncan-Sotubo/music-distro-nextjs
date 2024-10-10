import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    return db.blog.findMany({
      orderBy: {
        publishedAt: "desc",
      },
    });
  }),
  getPost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      return db.blog.findUnique({
        where: {
          id: input.postId,
        },
      });
    }),
});
