// /app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextResponse) {
  try {
    const { searchParams } = new URL(request.url);

    // --- PAGINACJA ---
    const limit = Number(searchParams.get("limit") ?? 6);
    const page = Number(searchParams.get("page") ?? 1);
    const skip = (page - 1) * limit;

    // --- SORTOWANIE ---
    const sort = searchParams.get("sort") ;
    let orderBy: any = { createdAt: "desc" };
    if (sort === "priceAsc") orderBy = { price: "asc" };
    else if (sort === "priceDesc") orderBy = { price: "desc" };
    else if (sort === "oldest") orderBy = { createdAt: "asc" };

    // --- FILTROWANIE ---
    // Kategorie
    const categoryIds = searchParams.getAll("categoryId").map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    // Przedział cenowy
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;

    // Tworzymy obiekt where dynamicznie
    const where: any = {};
    if (categoryIds.length > 0) {
      where.categoryId = { in: categoryIds };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    // --- POBRANIE DANYCH ---
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        take: limit,
        skip,
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          categoryId: true,
          brandId: true,
          createdAt: true,
          category: { select: { id: true, name: true, image: true } },
          brand: { select: { id: true, name: true, logo: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

   const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      products,
      pagination: {
        page,
        pages: totalPages,
        total,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Coś poszło nie tak" }, { status: 500 });
  }
}