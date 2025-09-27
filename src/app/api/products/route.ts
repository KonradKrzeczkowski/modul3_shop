import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type OrderBy = {
  createdAt?: "asc" | "desc";
  price?: "asc" | "desc";
};
type ProductFindManyArgs = Parameters<typeof prisma.product.findMany>[0];
type ProductWhere = NonNullable<ProductFindManyArgs>["where"];
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Nie jesteś zalogowany" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 6);
    const page = Number(searchParams.get("page") ?? 1);
    const skip = (page - 1) * limit;

    const sort = searchParams.get("sort");
    let orderBy: OrderBy = { createdAt: "desc" };
    if (sort === "priceAsc") orderBy = { price: "asc" };
    else if (sort === "priceDesc") orderBy = { price: "desc" };
    else if (sort === "oldest") orderBy = { createdAt: "asc" };

    const categoryIds = searchParams
      .getAll("categoryId")
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));

    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;

    const where: ProductWhere = {};
    if (categoryIds.length > 0) where.categoryId = { in: categoryIds };
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

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
          imageUrl: true,
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
      pagination: { page, pages: totalPages, total },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Coś poszło nie tak" }, { status: 500 });
  }
}
