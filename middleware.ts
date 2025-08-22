import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes  = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const url  = req.nextUrl.clone();
  const path = url.pathname;

  const cookieStore = await cookies();
  const access = cookieStore.get("accessToken")?.value;

  const isPrivate = privateRoutes.some((r) => path.startsWith(r));
  const isPublic  = publicRoutes.some((r) => path.startsWith(r));

  if (!access && isPrivate) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (access && isPublic) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};