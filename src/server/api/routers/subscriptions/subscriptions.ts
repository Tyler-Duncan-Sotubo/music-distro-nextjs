import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
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
  createSubscription: protectedProcedure
    .input(
      z.object({
        plan: z.string().min(1, "Product is required"),
        productId: z.string().min(1, "Product is required"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;

      // Get the current date
      const currentDate = new Date();
      // Add 1 year to the current date
      const oneYearLater = new Date(currentDate);
      oneYearLater.setFullYear(currentDate.getFullYear() + 1);

      // Check if cart item already exists
      const userSubscription = await db.subscriptions.create({
        data: {
          userId: session.user.id,
          plan: input.plan,
          expiresAt: oneYearLater,
        },
      });

      // Check if cart item already exists in the database and throw an error if it does
      if (!userSubscription) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Subscription creation failed",
        });
      }

      // Delete cart item if it exists
      await db.cartItem.delete({
        where: {
          productId: input.productId,
          userId: session.user.id,
        },
      });
    }),
});
