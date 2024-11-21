import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
export async function GET() {
  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        productName: true,
        productDescription: true,
        tagLine: true,
        imageUrl: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
