import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return new Response(JSON.stringify(brands), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch brands", error);
    return new Response(JSON.stringify({ error: "Failed to fetch brands" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}