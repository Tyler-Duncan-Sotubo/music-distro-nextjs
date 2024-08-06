import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  artistName: z.string().min(1, "Artist name is required"),
  label: z.string().min(1, "Label is required"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string(),
  howDidYouHearAboutUs: z.string(),
  youtube: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  vevo: z.string().optional(),
});

export const userRouter = createTRPCRouter({
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const user = await db.userInformation.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }),
  createUserInfo: protectedProcedure
    .input(schema)
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;
      const userInformation = await db.userInformation.create({
        data: {
          ...input,
          userId: session.user.id,
        },
      });

      if (!userInformation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user information",
        });
      }

      return userInformation;
    }),
  updateUserInfo: protectedProcedure
    .input(schema)
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;
      const userInformation = await db.userInformation.update({
        where: {
          userId: session.user.id,
        },
        data: input,
      });

      if (!userInformation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user information",
        });
      }

      return userInformation;
    }),
});
