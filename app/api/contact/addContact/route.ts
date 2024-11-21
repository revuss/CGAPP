import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phoneNumber, message } = body;

    if (!name || !email || !phoneNumber || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 207 }
      );
    }

    const existingContact = await prisma.contact.findUnique({
      where: { phoneNumber },
    });

    if (existingContact) {
      return NextResponse.json(
        { message: "Phone number already exists. We will contact you soon." },
        { status: 209 }
      );
    }

    const newContact = await prisma.contact.create({
      data: {
        name,
        email,
        phoneNumber,
        message,
      },
    });

    return NextResponse.json(
      {
        statusCode: "SUCCESS",
        message: "Your message has been sent! We’ll respond shortly.",
        contact: newContact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 202 }
    );
  }
}
