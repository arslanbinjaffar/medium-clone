import prisma from "@/database";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authMiddleware } from "../../authMiddleware";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user=authMiddleware(request)    
      const blog = await prisma.blog.findUnique({
        where: { id },
      });

      if (!blog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Blog retrieved successfully", blog,user }, { status: 200 });
    
  } catch (error) {
      return NextResponse.json({ message: "Failed to fetch blog", error }, { status: 500 });
    }
  }
  

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data,
    });

    return NextResponse.json({ message: "Blog updated successfully", blog: updatedBlog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update blog", error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete blog", error }, { status: 500 });
  }
}
