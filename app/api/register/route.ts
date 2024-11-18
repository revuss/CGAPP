import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { error } from "console";
import { handleError } from "../handler/errorHandle";

export async function POST(request: Request) {
  try {
    const { email, password, name, phoneNumber } = await request.json();
    if (!email || !password || !name || !phoneNumber) {
      return handleError(error, "All fields required", 202);
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (existingUser) {
      const message =
        existingUser.email === email
          ? "User with this email already exists"
          : "User with this phone number already exists";
      return handleError(error, message, 202);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phoneNumber,
        isLoggedIn: false,
        authorized: true,
      },
    });
    return NextResponse.json(
      {
        statusCode: "SUCCESS",
        message: "User registered successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return handleError(error);
  }
}
