import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { checkServerSession } from "@/lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some(r => pathname.startsWith(r));
  const isPrivateRoute = privateRoutes.some(r => pathname.startsWith(r));
  if (!accessToken && refreshToken) {
    const data = await checkServerSession(); 
    const setCookieHeader = data.headers["set-cookie"];

    if (setCookieHeader) {
      const setCookies = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      const res = isPublicRoute
        ? NextResponse.redirect(new URL("/", request.url))
        : NextResponse.next();

      for (const sc of setCookies) {
        const parsed = parse(sc);
        const [name, value] =
          Object.entries(parsed).find(([k]) => !["Path", "Expires", "Max-Age"].includes(k))!;

        res.cookies.set(name, String(value), {
          path: parsed.Path,
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          httpOnly: true,
          secure: true,
          sameSite: "lax",
        });
      }
      return res;
    }
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};