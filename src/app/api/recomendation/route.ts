import { prisma } from "@/lib/prisma";

type Product = {
  id: number;
  name: string;
  price: number;
  category: { id: number; name: string; image: string };
  imageUrl: string;
};

export async function getRecommendedProducts(): Promise<Product[]> {
  try {
    const productsRaw = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        categoryId: true,
        price: true,
        imageUrl: true,
        category: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    const products: Product[] = productsRaw.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      imageUrl: p.imageUrl ?? p.category.image ?? "",
      category: {
        id: p.categoryId,
        name: p.category.name,
        image: p.category.image ?? "",
      },
    }));

    if (!products.length) return [];

    const categoriesMap: Record<string, Product[]> = {};
    for (const product of products) {
      if (!categoriesMap[product.category.id]) {
        categoriesMap[product.category.id] = [];
      }
      categoriesMap[product.category.id].push(product);
    }

    const selected: Product[] = [];
    for (const categoryId of Object.keys(categoriesMap)) {
      const items = categoriesMap[categoryId];
      const random = items[Math.floor(Math.random() * items.length)];
      selected.push(random);
    }

    if (selected.length < 6) {
      const remaining = products.filter(
        (p) => !selected.find((s) => s.id === p.id)
      );
      const shuffled = remaining.sort(() => 0.5 - Math.random());
      selected.push(...shuffled.slice(0, 6 - selected.length));
    }

    return selected.slice(0, 6);
  } catch (error) {
    console.error("Failed to fetch recommendations", error);
    return [];
  }
}
