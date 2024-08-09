import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { uploadImage } from "@/server/services/aws";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const photoRouter = createTRPCRouter({
  getProfilePhoto: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const userPhoto = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        image: true,
      },
    });

    if (!userPhoto) {
      return null;
    }

    return userPhoto;
  }),
  updateProfilePhoto: protectedProcedure
    .input(
      z.object({
        imageFileName: z.string().min(1, "Image is required"),
        image: z.string().min(1, "Image is required"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;

      const imageFileName = input.imageFileName.split(" ").join("");

      const imageLink = await uploadImage(
        session.user,
        imageFileName,
        input.image,
      );

      const updateImage = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          image: imageLink,
        },
      });

      if (!updateImage) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user image",
        });
      }

      return {
        message: "Image uploaded successfully",
      };
    }),
});
