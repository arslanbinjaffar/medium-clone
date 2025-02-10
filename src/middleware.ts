import { NextRequest, NextResponse } from "next/server";

// Define an array of protected routes
const protectedRoutes = ["/blog", "/myblog"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/blog", req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/blog", req.url));
  }

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/blog/:path*", "/myblog"],
};