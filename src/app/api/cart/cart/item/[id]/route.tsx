import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

// PATCH - zmiana ilości produktu w koszyku
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { quantity } = body;
    const itemId = parseInt(params.id);

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { message: "Nieprawidłowa ilość" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Nie zalogowany" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: { include: { items: true } } },
    });

    if (!user?.cart) {
      return NextResponse.json({ message: "Koszyk nie istnieje" }, { status: 404 });
    }

    const item = user.cart.items.find((i) => i.id === itemId);
    if (!item) {
      return NextResponse.json({ message: "Produkt w koszyku nie istnieje" }, { status: 404 });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  }
}

// DELETE - usuwanie produktu z koszyka
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = parseInt(params.id, 10);
    if (isNaN(itemId)) return NextResponse.json({ message: "Nieprawidłowe ID" }, { status: 400 });

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ message: "Nie zalogowany" }, { status: 401 });

    // Szukamy itemu, który należy do użytkownika
    const item = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          user: { email: session.user.email },
        },
      },
    });

    if (!item) return NextResponse.json({ message: "Produkt w koszyku nie istnieje" }, { status: 404 });

    await prisma.cartItem.delete({ where: { id: itemId } });

    return NextResponse.json({ message: "Produkt usunięty z koszyka ✅" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Nie zalogowany" }, { status: 401 });
    }

    // Pobieramy koszyk użytkownika wraz z produktami
    const cart = await prisma.cart.findUnique({
      where: {
        userId: (await prisma.user.findUnique({
          where: { email: session.user.email },
        }))?.id,
      },
      include: {
        items: {
          include: {
            product: true, // wszystkie dane produktu, które chcesz
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ message: "Koszyk nie istnieje" }, { status: 404 });
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  }
}