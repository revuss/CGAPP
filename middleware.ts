/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!JWT_SECRET) {
    return NextResponse.json(
      { error: "Server configuration error: JWT_SECRET is not set" },
      { status: 500 }
    );
  }

  if (request.nextUrl.pathname === "/login") {
    if (token) {
      try {
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch (err: any) {
        console.log("Token verification error", err);
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return NextResponse.next();
  } catch (err: any) {
    console.log("Token verification error", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/api/visitors",
    "/api/visitors/del",
    "/admin/:path*",
    "/admin/careers",
    "/api/contact",
    "/api/career/del",
    "/api/contact/del",
    "/api/career",
    "/api/stats",
    "/api/visitors",
    "/api/userdts",
    "/login",
  ],
};
