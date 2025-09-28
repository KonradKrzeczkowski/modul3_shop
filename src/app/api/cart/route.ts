import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const cart = await prisma.user.findMany({
      select: {
        id: true,
   
      },
    });
    return NextResponse.json(cart);
  } catch (error) {
    console.error("GET /api/cart/cart error:", error);
    return NextResponse.json({ error: "Failed to fetch carts" }, { status: 500 });
  }
}