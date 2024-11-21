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
      "name",
      "phoneNumber",
      "email",
      "createdAt",
      "statusBlocked",
      "failedPasswords",
      "authorized",
      "updatedAt",
    ];
    if (!validSortColumns.includes(sortCol)) {
      return NextResponse.json(
        { error: "Invalid sort column" },
        { status: 400 }
      );
    }

    const totalCount = await prisma.user.count();

    let users;
    if (pageSize) {
      users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          createdAt: true,
          statusBlocked: true,
          failedPasswords: true,
          authorized: true,
          updatedAt: true,
        },
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortCol]: sortOrder,
        },
      });
    } else {
      users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          createdAt: true,
          statusBlocked: true,
          failedPasswords: true,
          authorized: true,
          updatedAt: true,
        },
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
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
