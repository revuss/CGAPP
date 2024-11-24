/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/app/lib/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json(
        { error: "Server Error: JWT_SECRET is not defined" },
        { status: 500 }
      );
    }

    let decodedToken: any;
    try {
      decodedToken = verify(token, jwtSecret);
    } catch (err: any) {
      return NextResponse.json(
        { error: `Unauthorized: Invalid token, ${err}` },
        { status: 403 }
      );
    }

    const userId = decodedToken?.userId;
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token payload" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true, phoneNumber: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const [
      usersCount,
      careersCount,
      contactsCount,
      visitorsCount,
      productsCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.career.count(),
      prisma.contact.count(),
      prisma.visitor.count(),
      prisma.products.count(),
    ]);

    const visitorData = await prisma.visitor.groupBy({
      by: ["createdAt", "country", "region"],
      _sum: { visitCount: true },
    });

    const visitorStats = visitorData.map((item) => ({
      date: item.createdAt.toISOString().split("T")[0], // Format date
      country: item.country,
      region: item.region,
      visitCount: item._sum.visitCount || 0,
    }));

    const response = {
      user: {
        username: user.name,
        email: user.email,
        phone: user.phoneNumber,
      },
      stats: [
        { name: "User Count", value: usersCount },
        { name: "Career Applications", value: careersCount },
        { name: "Contact Messages", value: contactsCount },
        { name: "Visitor Count", value: visitorsCount },
        { name: "Products Count", value: productsCount },
      ],
      visitorData: visitorStats,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error in stats API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
