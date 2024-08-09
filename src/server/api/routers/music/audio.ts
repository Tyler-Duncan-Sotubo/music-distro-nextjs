import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { uploadAudio, uploadImage } from "@/server/services/aws";
import {
  sendMusicReleaseAlertToAdmin,
  sendMusicReleaseEmail,
} from "@/server/services/mail";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  releaseDate: z.string().min(1, "Release Date is required"),
  primaryGenre: z.string().min(1, "Genre is required"),
  secondaryGenre: z.string().min(1, "Genre is required"),
  lyrics: z.string().optional(),
  label: z.string().min(1, "Label is required"),
  productionHolder: z.string().min(1, "Production Holder is required"),
  productionYear: z.string().min(1, "Production Year is required"),
  copyrightHolder: z.string().min(1, "copyright Holder is required"),
  copyrightYear: z.string().min(1, "copyright Year is required"),
  language: z.string().min(1, "Language is required"),
  releaseAudioLink: z.string().optional(),
  imageFileName: z.string().min(1, "Image is required"),
  audioFileName: z.string().min(1, "Audio is required"),
  releaseCover: z.string(),
  releaseAudio: z.string(),
});

export const audioRouter = createTRPCRouter({
  getReleases: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const audioReleases = await db.audio.findMany({
      where: {
        userId: session.user.id,
      },
    });

    if (!audioReleases) {
      return null;
    }

    return audioReleases;
  }),
  createAudioRelease: protectedProcedure
    .input(schema)
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;

      const imageFileName = input.imageFileName.split(" ").join("");
      const audioFileName = input.audioFileName.split(" ").join("");

      const imageLink = await uploadImage(
        session.user,
        imageFileName,
        input.releaseCover,
      );

      const audioLink = await uploadAudio(
        session.user,
        audioFileName,
        input.releaseAudio,
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { audioFileName: _, imageFileName: __, ...rest } = input;

      const audioRelease = await db.audio.create({
        data: {
          ...rest,
          releaseDate: new Date(rest.releaseDate),
          userId: session.user.id,
          releaseAudio: audioLink,
          releaseCover: imageLink,
          releaseType: "audio",
          status: "pending",
        },
      });

      if (!audioRelease) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create audio release",
        });
      }

      await sendMusicReleaseEmail(session.user.email, input.artist);
      await sendMusicReleaseAlertToAdmin();

      return audioRelease;
    }),
});
