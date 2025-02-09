import prisma from "@/database";
import { authMiddleware } from "../authMiddleware";
import { NextRequest, NextResponse } from "next/server";




export async function GET() {
  try {
    
    const blogs = await prisma.blog.findMany();

    const authorIds = [...new Set(blogs.map((blog) => blog.authorId))];

    const authors = await prisma.user.findMany({
      where: { id: { in: authorIds } }, 
      select: { id: true, name: true, email: true },
    });

    const blogsWithAuthors = blogs.map((blog) => ({
      ...blog,
      author: authors.find((author) => author.id === blog.authorId) || null,
    }));

    return NextResponse.json(
      { message: "Blogs retrieved successfully", blogs: blogsWithAuthors },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blogs", error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}



export async function POST(req: NextRequest) {
  try {
    const user = await authMiddleware(req);

    if (user instanceof NextResponse) {
      return user;
    }

    const data = await req.json();

    if (!data.title || !data.content) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newBlog = await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: user?.id as string, 
      }
    });

    return NextResponse.json({ message: "Blog created successfully", blog: newBlog }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Failed to create blog", error: error instanceof Error ? error.message : error }, { status: 500 });
  }
}
