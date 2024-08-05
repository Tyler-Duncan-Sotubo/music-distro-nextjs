import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

type isAuthenticated = {
  name: string;
  value: string;
};

const protectedRoutes = ["/dashboard"];

async function getCookies(
  cookieModule: typeof cookies,
): Promise<isAuthenticated> {
  const token = cookies().get("next-auth.session-token") as isAuthenticated;
  return token;
}

export default async function middleware(req: NextRequest) {
  const isAuthenticated = await getCookies(cookies);
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (isAuthenticated && req.nextUrl.pathname === "/login") {
    const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (isAuthenticated && req.nextUrl.pathname === "/register") {
    const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
