import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/database";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
} | null; 

export async function authMiddleware(req: NextRequest): Promise<AuthUser> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });

    return user || null;
  } catch (error) {
    return null; 
  }
}
