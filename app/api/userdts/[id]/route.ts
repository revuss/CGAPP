import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: parseInt(userId, 10) },
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
