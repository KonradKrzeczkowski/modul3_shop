import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {

    const session = await getServerSession(authOptions);
    console.log("Session:", session); 
if (!session?.user?.id) {
      console.log("Brak user.id w sesji");
      return new Response(JSON.stringify({ error: "Nie jesteś zalogowany" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
const userId = Number(session.user.id);
    console.log("User ID:", userId); 
 const userWithAddresses = await prisma.user.findUnique({
      where: { id: userId },
      include: { address: true },
    });

    console.log("User with addresses:", userWithAddresses); 
return new Response(JSON.stringify(userWithAddresses?.address || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Błąd serwera:", err);
    return new Response(JSON.stringify({ error: "Błąd serwera" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = Number(session.user.id); 
    const body = await req.json();
    const { address, country, province, city, postalCode, isMain } = body;

    if (!address || !country || !province || !city || !postalCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
        addressLine: address,
        country,
        province,
        city,
        postalCode,
        isMain: Boolean(isMain),
      },
    });

    return NextResponse.json(newAddress);
  } catch (err) {
    console.error("Prisma error:", err);
    return NextResponse.json({ error: "Internal server error"  }, { status: 500 });
  }
}
