import prisma from "@/database";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: { author: true },
    });

    if (!blog) {
      return Response.json({ message: "Blog not found" }, { status: 404 });
    }

    return Response.json({ message: "Blog retrieved successfully", blog }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Failed to fetch blog", error }, { status: 500 });
  }
}


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data,
    });

    return Response.json({ message: "Blog updated successfully", blog: updatedBlog }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Failed to update blog", error }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.blog.delete({
      where: { id: params.id },
    });

    return Response.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Failed to delete blog", error }, { status: 500 });
  }
}
