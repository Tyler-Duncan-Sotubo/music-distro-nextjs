import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

type isAuthenticated = {
  name: string;
  value: string;
};

const protectedRoutes = ["/dashboard"];

async function getCookies(
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  cookies: typeof import("next/headers").cookies,
): Promise<isAuthenticated> {
  const environment = process.env.NODE_ENV; // 'development' or 'production'
  let token;

  if (environment === "development") {
    token = cookies().get("next-auth.session-token");
  } else if (environment === "production") {
    token = cookies().get("next-auth.state");
  }
  return token as isAuthenticated;
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
