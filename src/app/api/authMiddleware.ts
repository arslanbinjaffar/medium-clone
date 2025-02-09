import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/database";

type AuthUser = {
  id: string;
  name: string;
  email: string;
} | NextResponse;

export async function authMiddleware(req: NextRequest): Promise<AuthUser> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true }
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized: User not found" }, { status: 401 });
    }

    return user; 
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
  }
}
