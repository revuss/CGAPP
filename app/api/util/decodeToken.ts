import jwt from "jsonwebtoken";
import prisma from "@/app/lib/prisma";

export async function decodeToken(token: string) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

  const decoded = jwt.verify(token, jwtSecret);

  if (typeof decoded !== "object" || !decoded.userId) {
    throw new Error("Invalid token payload");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      name: true,
      phoneNumber: true,
      email: true,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
}
