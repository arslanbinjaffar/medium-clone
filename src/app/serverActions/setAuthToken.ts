"use server";
import { cookies } from "next/headers";

export async function setAuthToken(token: string) {
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return { message: "Cookie set successfully" };
}
