import prisma from "@/database";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true },
    });

    return Response.json({ message: "User registered successfully", user: newUser }, { status: 201 });

  } catch (error) {
    return Response.json({ message: "Something went wrong", error }, { status: 500 });
  }
}
