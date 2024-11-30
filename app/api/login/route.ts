import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { error } from "console";
import { handleError } from "../handler/errorHandle";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return handleError(error, "All fields are required", 200);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return handleError(error, "Invalid email or password", 201);
  }

  if (user.statusBlocked) {
    return handleError(
      error,
      "Account is blocked due to multiple failed login attempts",
      203
    );
  }

  if (!user.authorized) {
    return handleError(error, "User is not authorized to log in", 200);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const updatedFailedCount = user.failedPasswords + 1;
    const statusBlocked = updatedFailedCount >= 4;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedPasswords: updatedFailedCount,
        statusBlocked,
      },
    });

    return handleError(error, "Invalid email or password", 202);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      failedPasswords: 0,
      isLoggedIn: true,
    },
  });

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return handleError(undefined, "JWT_SECRET is not defined", 201);
  }

  const token = jwt.sign({ userId: user.id }, jwtSecret, {
    expiresIn: "1h",
  });

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 32400,
  });

  return NextResponse.json({
    statusCode: "SUCCESS",
    message: "Login successful",
  });
}
