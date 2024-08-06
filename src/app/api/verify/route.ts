import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { env } from "@/env";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  const user = await db.user.findFirst({
    where: {
      emailVerificationToken: token,
      emailVerificationTokenExpiration: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    return NextResponse.redirect(
      `${env.NEXT_PUBLIC_HOME_URL}/email-verification?success=token-expired`,
    );
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      emailVerificationToken: null,
      emailVerificationTokenExpiration: null,
    },
  });

  return NextResponse.redirect(
    `${env.NEXT_PUBLIC_HOME_URL}/email-verification?success=verified`,
  );
}
