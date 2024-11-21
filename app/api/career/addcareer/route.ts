import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { handleError } from "../../handler/errorHandle";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phoneNumber, email } = body;

    if (!name || !phoneNumber || !email) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 202 }
      );
    }

    const existingCareer = await prisma.career.findUnique({
      where: { phoneNumber },
    });

    if (existingCareer) {
      return NextResponse.json(
        { message: "Phone number already exists. We will contact you soon." },
        { status: 201 }
      );
    }

    const newCareer = await prisma.career.create({
      data: {
        name,
        phoneNumber,
        email,
      },
    });

    return NextResponse.json(
      {
        statusCode: "SUCCESS",
        message: "Your career form has been submitted successfully.",
        career: newCareer,
      },
      { status: 201 }
    );
  } catch (error) {
    handleError(error, "Error creating career application", 500);
    return NextResponse.json(
      { error: "Failed to create career application" },
      { status: 207 }
    );
  }
}
