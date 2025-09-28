import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest,NextResponse } from "next/server";



type Params = Promise<{ id: string }>;

export async function PATCH(
  req: NextRequest,
  segmentData: { params: Params }
) {
  try {
    const params = await segmentData.params; // <- czekamy na promise
    const itemId = parseInt(params.id, 10);

    const body = await req.json();
    const { quantity } = body;

    if (!quantity || quantity < 1) {
      return NextResponse.json({ message: "Nieprawidłowa ilość" }, { status: 400 });
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

export async function DELETE(
  req: NextRequest,
  segmentData: { params: Params }
) {
  try {
    const params = await segmentData.params;
    const itemId = parseInt(params.id, 10);

    if (isNaN(itemId)) {
      return NextResponse.json({ message: "Nieprawidłowe ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Nie zalogowany" }, { status: 401 });
    }

    const item = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { user: { email: session.user.email } },
      },
    });

    if (!item) {
      return NextResponse.json({ message: "Produkt w koszyku nie istnieje" }, { status: 404 });
    }

    await prisma.cartItem.delete({ where: { id: itemId } });

    const cart = await prisma.cart.findFirst({
      where: { user: { email: session.user.email } },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/cart/item/[id] error:", error);
    return NextResponse.json({ message: "Błąd serwera ❌" }, { status: 500 });
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