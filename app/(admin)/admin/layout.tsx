import React from "react";
import Header from "../components/header/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

async function layout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
  } catch (err) {
    console.error("Token verification failed:", err);
    redirect("/login");
  }

  return <Header>{children}</Header>;
}

export default layout;
