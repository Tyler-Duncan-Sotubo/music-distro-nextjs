import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

const newComment = z.object({
  ticketId: z.string().min(1, "ticketId is required"),
  content: z.string().min(1, "Title is required"),
});

export const commentRouter = createTRPCRouter({
  getCommentById: protectedProcedure
    .input(
      z.object({
        ticketId: z.string().min(1, "ticketId is required"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const comment = await db.comment.findMany({
        where: {
          ticketId: input.ticketId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!comment) {
        return null;
      }

      return comment;
    }),
  createComment: protectedProcedure
    .input(newComment)
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;

      const comment = await db.comment.create({
        data: {
          ticketId: input.ticketId,
          content: input.content,
          userId: session.user.id,
        },
      });

      if (!comment) {
        return null;
      }

      return comment;
    }),
});
