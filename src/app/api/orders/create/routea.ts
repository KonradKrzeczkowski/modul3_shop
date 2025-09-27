import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

type OrderItemInput = {
  cartItemId?: number;   // opcjonalnie ID w koszyku do usunięcia
  productId: number;
  quantity: number;
  addedPrice: number;
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Nie zalogowany" }, { status: 401 });
    }

    const body = await req.json();
    const { items }: { items: OrderItemInput[] } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "Brak produktów" }, { status: 400 });
    }

    // Pobieramy użytkownika wraz z koszykiem
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: { include: { items: true } } },
    });
    if (!user) return NextResponse.json({ message: "Użytkownik nie istnieje" }, { status: 404 });

    // Szukamy istniejącego zamówienia PENDING
    let order = await prisma.order.findFirst({
      where: { userId: user.id, status: "PENDING" },
      include: { orderItems: true },
    });

    if (order) {
      // Dodajemy produkty do istniejącego zamówienia
      await prisma.orderItem.createMany({
        data: items.map(i => ({
          orderId: order!.id,
          productId: i.productId,
          quantity: i.quantity,
          priceAtPurchase: i.addedPrice,
        })),
      });

      // Aktualizujemy totalAmount zamówienia
      const totalAmount =
        order.orderItems.reduce((sum, item) => sum + item.quantity * item.priceAtPurchase, 0) +
        items.reduce((sum, i) => sum + i.quantity * i.addedPrice, 0);

      order = await prisma.order.update({
        where: { id: order.id },
        data: { totalAmount },
        include: { orderItems: true },
      });
    } else {
      // Tworzymy nowe zamówienie
      const totalAmount = items.reduce((sum, i) => sum + i.quantity * i.addedPrice, 0);
      order = await prisma.order.create({
        data: {
          userId: user.id,
          totalAmount,
          status: "PENDING",
          orderItems: { create: items.map(i => ({ ...i, priceAtPurchase: i.addedPrice })) },
        },
        include: { orderItems: true },
      });
    }

    // Usuwamy produkty z koszyka, jeśli podano cartItemId
    const cartItemIdsToDelete = items
      .map(i => i.cartItemId)
      .filter((id): id is number => !!id);

    if (cartItemIdsToDelete.length > 0) {
      await prisma.cartItem.deleteMany({ where: { id: { in: cartItemIdsToDelete } } });
    }

    return NextResponse.json({ message: "Zamówienie zapisane ✅", order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Błąd serwera ❌" }, { status: 500 });
  }
}