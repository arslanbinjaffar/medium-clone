import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../authMiddleware";

export async function GET(request: NextRequest) {
  try {
    const user = await authMiddleware(request);
   console.log(user,"user")
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const blogs = await prisma.blog.findMany({
      where: { authorId: user.id },
    });

    return NextResponse.json({ message: "Blogs retrieved successfully", blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blogs", error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
