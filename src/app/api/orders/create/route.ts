import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

type OrderItemInput = {
  id: number;          // CartItem ID
  quantity: number;
  addedPrice?: number; // cena w koszyku
};

// POST - tworzenie zamówienia
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items }: { items: OrderItemInput[] } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "Brak produktów do zamówienia" }, { status: 400 });
    }

    // Pobranie użytkownika
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Nie zalogowany" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: { include: { items: { include: { product: true } } } } },
    });

    if (!user || !user.cart) {
      return NextResponse.json({ message: "Koszyk nie istnieje" }, { status: 404 });
    }

    // Filtrujemy tylko produkty należące do użytkownika
    const cartItems = user.cart.items.filter(ci => items.some(i => i.id === ci.id));

    if (cartItems.length === 0) {
      return NextResponse.json({ message: "Brak poprawnych produktów w koszyku" }, { status: 400 });
    }

    // Tworzenie danych do zamówienia
    const orderItemsData = cartItems.map(ci => {
      const inputItem = items.find(i => i.id === ci.id)!;
      return {
        productId: ci.productId,
        quantity: inputItem.quantity,
        priceAtPurchase: inputItem.addedPrice ?? ci.addedPrice ?? ci.product?.price ?? 0,
      };
    });

    // Obliczenie całkowitej kwoty
    const totalAmount = orderItemsData.reduce(
      (sum, item) => sum + item.quantity * item.priceAtPurchase,
      0
    );

    // Utworzenie zamówienia
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        status: "PENDING",
        orderItems: { create: orderItemsData },
      },
      include: { orderItems: true },
    });

    // Usuwamy produkty z koszyka
    const cartItemIdsToDelete = cartItems.map(ci => ci.id);
    await prisma.cartItem.deleteMany({ where: { id: { in: cartItemIdsToDelete } } });

    return NextResponse.json({ message: "Zamówienie utworzone ✅", order });
  } catch (error) {
    console.error("POST /api/orders/create error:", error);
    return NextResponse.json({ message: "Błąd serwera ❌" }, { status: 500 });
  }
}