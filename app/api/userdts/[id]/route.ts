import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id, 10);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { statusCode: "SUCCESS", message: "User deleted successfully" },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error deleting user:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { statusCode: "FAILED", details: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        statusCode: "FAILED",
        error: "Failed to delete user",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
