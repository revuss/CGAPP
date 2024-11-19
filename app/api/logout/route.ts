import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleError } from "../handler/errorHandle";

export async function GET() {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");

  if (!tokenCookie) {
    return handleError(
      new Error("No user found"),
      "No token found, already logged out.",
      200
    );
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return handleError(undefined, "JWT_SECRET is not defined", 500);
    }

    const token = tokenCookie.value;

    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decodedToken || typeof decodedToken.userId !== "number") {
      return handleError(new Error("Invalid token"), "Invalid token", 401);
    }

    const userId = decodedToken.userId;

    await prisma.user.update({
      where: { id: userId },
      data: { isLoggedIn: false },
    });

    (await cookieStore).delete("token");

    return NextResponse.json(
      { statusCode: "SUCCESS", message: "Successfully logged out." },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error during logout:", (error as Error).message || error);
    return NextResponse.json(
      { message: "An unexpected error occurred during logout." },
      { status: 500 }
    );
  }
}
