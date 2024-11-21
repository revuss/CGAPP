import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deletedCareer = await prisma.career.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    return NextResponse.json({
      statusCode: "SUCCESS",
      message: "Career deleted successfully",
      deletedCareer,
    });
  } catch (error: unknown) {
    console.error("Error deleting career:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { statusCode: "FAILED", error: "Career not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to delete career" },
      { status: 500 }
    );
  }
}
