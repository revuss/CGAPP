import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { statusCode: "FAILED", error: "Product ID is required" },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.products.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { statusCode: "FAILED", error: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.products.delete({
      where: { id },
    });

    return NextResponse.json({
      statusCode: "SUCCESS",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
