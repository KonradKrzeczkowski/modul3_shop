import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        email: true,
        phone: true,
        createdAt: true,
        passwordHash:true,
        cart:true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/user error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, phone, country } = body;

    if (!email || !password || !phone) {
      return NextResponse.json({ error: "Email, password and mobile are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }
const existingPhone = await prisma.user.findUnique({ where: { phone } });
if (existingPhone) {
  return NextResponse.json({ error: "Phone number already in use" }, { status: 400 });
}
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, phone, passwordHash, country },
    });

    return NextResponse.json({ id: user.id, email: user.email });
  } catch (error: unknown) {
    console.error("POST /api/user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}