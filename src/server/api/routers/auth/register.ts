import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

export const registerRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, name, password } = input;
      const { db } = ctx;
      const existingUserByEmail = await db.user.findUnique({
        where: { email },
      });

      if (existingUserByEmail) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      const { password: _, ...rest } = newUser;

      return rest;
    }),
});
