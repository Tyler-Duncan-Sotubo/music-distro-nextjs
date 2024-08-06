import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { generateEmailVerificationToken } from "@/server/services/token/generateToken";
import { verifyEMail } from "@/server/services/mail";

export const verifyRouter = createTRPCRouter({
  verifyUser: protectedProcedure.mutation(async ({ ctx }) => {
    const { db } = ctx;
    const existingUserByEmail = await db.user.findUnique({
      where: { email: ctx.session?.user.email ?? undefined },
    });

    if (!existingUserByEmail) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User with Email Does not exist",
      });
    }

    const email = ctx.session?.user.email ?? "";
    const token = await generateEmailVerificationToken(email);

    // Send verification email
    await verifyEMail(email, existingUserByEmail.name!, token);
  }),
});
