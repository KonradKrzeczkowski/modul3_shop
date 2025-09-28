import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Twój NextAuth handler
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Nieautoryzowany" }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);

    const cart = await prisma.cart.findUnique({
      where: { userId },
      select: {
        id: true,
        items: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true,
                category: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ error: "Koszyk nie znaleziony" }, { status: 404 });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("GET /api/cart/me error:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}