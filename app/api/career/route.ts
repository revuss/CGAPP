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
    const sortCol = body.sortCol || "appliedOn";
    const sortOrder =
      body.sortOrder === "asc" || body.sortOrder === "desc"
        ? body.sortOrder
        : "desc";

    const validSortColumns = [
      "id",
      "name",
      "phoneNumber",
      "email",
      "appliedOn",
    ];
    if (!validSortColumns.includes(sortCol)) {
      return NextResponse.json(
        { error: "Invalid sort column" },
        { status: 400 }
      );
    }

    const totalCount = await prisma.career.count();

    let careers;
    if (pageSize) {
      careers = await prisma.career.findMany({
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortCol]: sortOrder,
        },
      });
    } else {
      careers = await prisma.career.findMany({
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
      careers,
    });
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      { error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}
