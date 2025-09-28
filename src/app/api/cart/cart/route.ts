// app/api/cart/add/route.ts
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity } = body;

    if (!productId || quantity < 1) {
      return NextResponse.json({ message: "Nieprawidłowe dane" }, { status: 400 });
    }

    // Pobieramy sesję
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Nie zalogowany" }, { status: 401 });
    }

    // Pobieramy użytkownika
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ message: "Użytkownik nie znaleziony" }, { status: 404 });
    }

    // Sprawdzamy koszyk użytkownika
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: true },
    });

    if (!cart) {
      // Tworzymy nowy koszyk jeśli nie istnieje
      cart = await prisma.cart.create({
        data: { userId: user.id },
        include: { items: true },
      });
    }

    // Sprawdzamy czy produkt już jest w koszyku
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      // Zwiększamy ilość
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Pobieramy produkt, żeby znać cenę
      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) {
        return NextResponse.json({ message: "Produkt nie znaleziony" }, { status: 404 });
      }

      // Dodajemy nowy produkt do koszyka
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity,
          addedPrice: product.price,
        },
      });
    }

    return NextResponse.json({ message: "Dodano do koszyka ✅" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Błąd serwera ❌" }, { status: 500 });
  }
}