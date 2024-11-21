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
      "name",
      "email",
      "phoneNumber",
      "message",
      "createdAt",
    ];
    if (!validSortColumns.includes(sortCol)) {
      return NextResponse.json(
        { error: "Invalid sort column" },
        { status: 400 }
      );
    }

    const totalCount = await prisma.contact.count();

    let contacts;
    if (pageSize) {
      contacts = await prisma.contact.findMany({
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortCol]: sortOrder,
        },
      });
    } else {
      contacts = await prisma.contact.findMany({
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
      contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
