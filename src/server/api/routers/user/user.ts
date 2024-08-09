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
  tiktok: z.string().optional(),
  soundcloud: z.string().optional(),
  website: z.string().optional(),
  spotify: z.string().optional(),
  apple: z.string().optional(),
  artistBio: z.string().optional(),
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
  getUserSocial: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const existingUserSocial = await db.social.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!existingUserSocial) {
      return null;
    }

    return existingUserSocial;
  }),
  createUserInfo: protectedProcedure
    .input(schema)
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;

      const {
        firstName,
        artistBio,
        lastName,
        artistName,
        label,
        phone,
        country,
        howDidYouHearAboutUs,
        ...rest
      } = input;
      // Create user information
      const userInformation = await db.userInformation.create({
        data: {
          firstName,
          artistBio,
          lastName,
          artistName,
          label,
          phone,
          country,
          howDidYouHearAboutUs,
          userId: session.user.id,
        },
      });

      if (!userInformation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user information",
        });
      }

      // create user social media links
      const socialLinks = await db.social.create({
        data: {
          ...rest,
          userId: session.user.id,
        },
      });

      if (!socialLinks) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create socialLinks information",
        });
      }

      return {
        message: "User information created successfully",
      };
    }),
  updateUserInfo: protectedProcedure
    .input(schema)
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;
      const {
        firstName,
        artistBio,
        lastName,
        artistName,
        label,
        phone,
        country,
        howDidYouHearAboutUs,
        ...rest
      } = input;

      const userInformation = await db.userInformation.update({
        where: {
          userId: session.user.id,
        },
        data: {
          firstName,
          artistBio,
          lastName,
          artistName,
          label,
          phone,
          country,
          howDidYouHearAboutUs,
        },
      });

      if (!userInformation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user information",
        });
      }

      const socialLinks = await db.social.update({
        where: {
          userId: session.user.id,
        },
        data: {
          ...rest,
        },
      });

      if (!socialLinks) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update socialLinks information",
        });
      }

      return {
        message: "User information updated successfully",
      };
    }),
});
