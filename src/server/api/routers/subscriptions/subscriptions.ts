import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const subscriptionRouter = createTRPCRouter({
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const subscription = await db.subscriptions.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!subscription) {
      return null;
    }

    return subscription;
  }),
});
