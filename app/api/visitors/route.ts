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
    const pageSize =
      body.pageSize !== null && body.pageSize !== undefined
        ? parseInt(body.pageSize, 10)
        : null;
    const sortCol = body.sortCol || "createdAt";
    const sortOrder =
      body.sortOrder === "asc" || body.sortOrder === "desc"
        ? body.sortOrder
        : "desc";

    const validSortColumns = [
      "id",
      "createdAt",
      "updatedAt",
      "ipAddress",
      "visitCount",
      "country",
      "countryCode",
      "region",
      "regionCode",
      "locality",
      "latitude",
      "longitude",
      "currency",
    ];
    if (!validSortColumns.includes(sortCol)) {
      return NextResponse.json(
        { error: "Invalid sort column" },
        { status: 400 }
      );
    }

    const totalCount = await prisma.visitor.count();

    let visitors;
    if (pageSize) {
      visitors = await prisma.visitor.findMany({
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortCol]: sortOrder,
        },
      });
    } else {
      visitors = await prisma.visitor.findMany({
        orderBy: {
          [sortCol]: sortOrder,
        },
      });
    }

    return NextResponse.json({
      totalCount,
      pageIndex: pageSize ? pageIndex : 1,
      pageSize: pageSize || totalCount,
      sortCol: sortCol,
      sortOrder: sortOrder,
      visitors,
    });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return NextResponse.json(
      { error: "Failed to fetch visitors" },
      { status: 500 }
    );
  }
}
