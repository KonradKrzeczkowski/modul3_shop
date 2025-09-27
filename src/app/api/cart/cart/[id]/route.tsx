import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cartId = parseInt(params.id, 10);
    if (isNaN(cartId)) {
      return NextResponse.json({ message: "Nieprawidłowe ID koszyka" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true, // 👈 żeby mieć np. product.name, price, imageUrl
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ message: "Koszyk nie znaleziony" }, { status: 404 });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Błąd serwera ❌" }, { status: 500 });
  }
}