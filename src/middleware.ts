import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
 

  if (pathname === "/login" && token || pathname === "/" && token) {
    return NextResponse.redirect(new URL("/blog", req.url));
  }

  if (pathname.startsWith("/blog") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/blog/:path*"],
};