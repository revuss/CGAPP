import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const dynamic = "force-dynamic";
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

    console.log("Fetched products:", products);

    const response = NextResponse.json(products, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
