import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { orderItemId, quantity, protection } = await request.json();

    if (
      typeof orderItemId !== "number" ||
      typeof quantity !== "number" ||
      (protection !== undefined && typeof protection !== "boolean")
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const updatedOrderItem = await prisma.orderItem.update({
      where: { id: orderItemId },
      data: {
        quantity,
        ...(protection !== undefined ? { protection } : {}),
      },
      include: { order: { include: { orderItems: true } } },
    });
    const totalAmount = updatedOrderItem.order.orderItems.reduce(
      (acc, item) =>
        acc + item.quantity * item.priceAtPurchase + (item.protection ? 1 : 0),
      0
    );

    const updatedOrder = await prisma.order.update({
      where: { id: updatedOrderItem.orderId },
      data: { totalAmount },
    });

    return NextResponse.json(
      {
        orderItem: updatedOrderItem,
        order: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATCH /api/orderItem/update]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
