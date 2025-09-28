import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

interface AddressInput {
  country: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  isMain?: boolean;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      console.log("Brak sesji lub user.id");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);

    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: { isMain: "desc" },
    });

    return NextResponse.json(addresses);
  } catch (error) {
    console.error("Błąd przy pobieraniu adresów:", error);
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      console.log("Brak sesji lub user.id");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);

    const body: AddressInput = await req.json();
    const { country, province, city, postalCode, addressLine, isMain } = body;

    if (!country || !province || !city || !postalCode || !addressLine) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (isMain) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isMain: false },
      });
    }

    const newAddress = await prisma.address.create({
      data: {
        userId,
        country,
        province,
        city,
        postalCode,
        addressLine,
        isMain: !!isMain,
      },
    });

    return NextResponse.json(newAddress);
  } catch (error) {
    console.error("Błąd przy tworzeniu adresu:", error);
    return NextResponse.json(
      { error: "Failed to create address" },
      { status: 500 }
    );
  }
}
