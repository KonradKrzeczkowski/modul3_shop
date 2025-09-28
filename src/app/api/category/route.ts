import { prisma } from "@/lib/prisma";

export async function GET() {
  const category = await prisma.category.findMany();
  return new Response(JSON.stringify(category));
}

