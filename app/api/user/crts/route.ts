/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      phoneNumber,
      email,
      statusBlocked,
      failedPasswords,
      authorized,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const updateData: {
      phoneNumber?: string;
      email?: string;
      statusBlocked?: boolean;
      failedPasswords?: number;
      authorized?: boolean;
    } = {};

    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (email) updateData.email = email;
    if (typeof statusBlocked === "boolean")
      updateData.statusBlocked = statusBlocked;
    if (typeof failedPasswords === "number")
      updateData.failedPasswords = failedPasswords;
    if (typeof authorized === "boolean") updateData.authorized = authorized;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        phoneNumber: true,
        email: true,
        statusBlocked: true,
        failedPasswords: true,
        authorized: true,
      },
    });

    return NextResponse.json({
      statusCode: "SUCCESS",
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      let fieldName = "";
      if (error.meta && error.meta.target) {
        fieldName = error.meta.target.includes("phoneNumber")
          ? "phoneNumber"
          : error.meta.target.includes("email")
          ? "email"
          : "unknown field";
      }
      return NextResponse.json(
        {
          statusCode: "FAILED",
          error: "Failed to update user details",
          details: `Already ${fieldName} exists`,
        },
        { status: 409 }
      );
    }

    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user details", details: error.message },
      { status: 500 }
    );
  }
}
