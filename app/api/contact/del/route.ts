import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { statusCode: "FAILED", error: "ID is required in query params" },
        { status: 400 }
      );
    }

    const deletedContact = await prisma.contact.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    return NextResponse.json({
      statusCode: "SUCCESS",
      message: "Contact deleted successfully",
      deletedContact,
    });
  } catch (error: unknown) {
    console.error("Error deleting contact:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { statusCode: "FAILED", error: "Contact not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
