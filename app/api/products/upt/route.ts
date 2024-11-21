import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, productName, productDescription, tagLine, imageUrl } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
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

    if (productName && productName !== existingProduct.productName) {
      const nameExists = await prisma.products.findFirst({
        where: { productName },
      });

      if (nameExists) {
        return NextResponse.json(
          { statusCode: "FAILED", error: "Product name must be unique" },
          { status: 400 }
        );
      }
    }

    const updatedProduct = await prisma.products.update({
      where: { id },
      data: {
        productName: productName || existingProduct.productName,
        productDescription:
          productDescription || existingProduct.productDescription,
        tagLine: tagLine || existingProduct.tagLine,
        imageUrl: imageUrl || existingProduct.imageUrl,
      },
    });

    return NextResponse.json({
      statusCode: "SUCCESS",
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { statusCode: "FAILED", error: "Failed to update product" },
      { status: 500 }
    );
  }
}
