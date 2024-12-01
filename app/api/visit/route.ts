import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const hasVisited = cookies.get("hasVisited");

    if (hasVisited) {
      return NextResponse.json({ message: "skipped" }, { status: 200 });
    }

    const body = await req.json();
    const { ipAddress } = body;

    if (!ipAddress) {
      return NextResponse.json(
        { message: "IP address is required in the request body" },
        { status: 201 }
      );
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */

    const locationResponse = await axios.get(
      `https://ipapi.co/${ipAddress}/json/`
    );
    const {
      country_name: country,
      country_code: countryCode,
      region,
      region_code: regionCode,
      city: locality,
      latitude,
      longitude,
      currency,
    } = locationResponse.data;

    const ipPrefix = ipAddress.split(".").slice(0, 3).join(".");
    const existingVisitor = await prisma.visitor.findFirst({
      where: {
        AND: [
          { ipAddress: { startsWith: ipPrefix } },
          { latitude },
          { longitude },
        ],
      },
    });

    if (!existingVisitor) {
      await prisma.visitor.create({
        data: {
          ipAddress,
          country,
          countryCode,
          region,
          regionCode,
          locality,
          latitude,
          longitude,
          currency,
          visitCount: 1,
        },
      });

      const response = NextResponse.json({ message: "new" });
      response.cookies.set("hasVisited", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    } else {
      await prisma.visitor.update({
        where: { id: existingVisitor.id },
        data: {
          updatedAt: new Date(),
          visitCount: existingVisitor.visitCount + 1,
        },
      });

      const response = NextResponse.json({ message: "update" });
      response.cookies.set("hasVisited", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error capturing user data:", error);
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 202 }
    );
  }
}
