/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";
import {
  getCountryVisitors,
  getMonthlyVisitors,
  getWeeklyVisitors,
} from "../util/visitorsQueries";
import { decodeToken } from "../util/decodeToken";

export async function POST(request: Request) {
  try {
    const totalViews = await prisma.visitor.aggregate({
      _sum: {
        visitCount: true,
      },
    });

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    const currentUser = token ? await decodeToken(token) : null;

    const body = await request.json();
    const visitorsFormat = body?.format || "week";

    let data = {};
    if (visitorsFormat === "week") {
      data = await getWeeklyVisitors();
    } else if (visitorsFormat === "month") {
      data = await getMonthlyVisitors();
    } else {
      return NextResponse.json(
        { error: "Invalid format. Use 'week' or 'month'." },
        { status: 400 }
      );
    }

    const countryVisitors = await getCountryVisitors();

    return NextResponse.json({
      statusCode: "SUCCESS",
      totalViews: totalViews._sum.visitCount?.toString() || "0",
      activeSession: currentUser,
      visitorsFormat,
      data,
      countryVisitors,
    });
  } catch (error: any) {
    console.error("Error in POST /api/stats:", error);
    return NextResponse.json(
      { error: "Failed to process visitor data", details: error.message },
      { status: 500 }
    );
  }
}
