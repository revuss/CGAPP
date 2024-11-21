import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { productName, productDescription, tagLine, imageUrl } = body;

    if (!productName || !productDescription || !tagLine || !imageUrl) {
      return NextResponse.json(
        {
          statusCode: "FAILED",
          error:
            "All fields (productName, productDescription, tagLine, imageUrl) are required",
        },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.products.findFirst({
      where: { productName },
    });

    if (existingProduct) {
      return NextResponse.json(
        { statusCode: "FAILED", error: "Product name must be unique" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.products.create({
      data: {
        productName,
        productDescription,
        tagLine,
        imageUrl,
      },
    });

    return NextResponse.json(
      {
        statusCode: "SUCCESS",
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { statusCode: "FAILED", error: "Failed to create product" },
      { status: 500 }
    );
  }
}
