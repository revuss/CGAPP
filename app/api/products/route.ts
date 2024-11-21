import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const pageIndex = body.pageIndex || 1;
    const pageSize = body.pageSize ? parseInt(body.pageSize, 10) : null;
    const sortCol = body.sortCol || "createdAt";
    const sortOrder =
      body.sortOrder === "asc" || body.sortOrder === "desc"
        ? body.sortOrder
        : "desc";

    const validSortColumns = [
      "id",
      "productName",
      "productDescription",
      "tagLine",
      "createdAt",
      "updatedAt",
    ];
    if (!validSortColumns.includes(sortCol)) {
      return NextResponse.json(
        { error: "Invalid sort column" },
        { status: 400 }
      );
    }

    const totalCount = await prisma.products.count();

    let products;
    if (pageSize) {
      products = await prisma.products.findMany({
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortCol]: sortOrder,
        },
      });
    } else {
      products = await prisma.products.findMany({
        orderBy: {
          [sortCol]: sortOrder,
        },
      });
    }

    return NextResponse.json({
      totalCount,
      pageIndex: pageSize ? pageIndex : 1,
      pageSize: pageSize || totalCount,
      sortCol,
      sortOrder,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
