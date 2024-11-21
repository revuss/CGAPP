import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deletedVisitor = await prisma.visitor.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    return NextResponse.json({
      statusCode: "SUCCESS",
      message: "Visitor deleted successfully",
      deletedVisitor,
    });
  } catch (error: unknown) {
    console.error("Error deleting visitor:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { statusCode: "FAILED", error: "Visitor not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to delete visitor" },
      { status: 500 }
    );
  }
}
