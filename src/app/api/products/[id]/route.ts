import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json({ error: "Nieprawidłowe ID" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
 
    });

    if (!product) {
      return NextResponse.json({ error: "Produkt nie znaleziony" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

