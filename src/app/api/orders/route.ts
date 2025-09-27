import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Pobranie użytkownika
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Nie zalogowany" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ message: "Użytkownik nie znaleziony" }, { status: 404 });
    }

    // Pobranie wszystkich zamówień użytkownika z itemami i produktami
    const orders = await prisma.order.findMany({
  where: { userId: user.id, status: "PENDING" },
  include: {
    orderItems: {
      include: {
        product: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    },
  },
  orderBy: { createdAt: "desc" },
});

    return NextResponse.json({ orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Błąd serwera ❌" }, { status: 500 });
  }
}
