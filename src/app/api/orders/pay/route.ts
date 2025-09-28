import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { orderIds } = await req.json();
    if (!orderIds || !Array.isArray(orderIds)) {
      return NextResponse.json(
        { message: "Invalid orderIds" },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { id: { in: orderIds }, status: "PENDING" },
      include: { orderItems: true },
    });

    if (!orders.length) {
      return NextResponse.json(
        { message: "Orders not found or already paid" },
        { status: 404 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.order.updateMany({
        where: { id: { in: orderIds } },
        data: { status: "PAID" },
      });

      for (const order of orders) {
        for (const item of order.orderItems) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: { decrement: item.quantity },
            },
          });
        }
      }

      return { updatedOrders: orderIds.length };
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Error paying orders:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
