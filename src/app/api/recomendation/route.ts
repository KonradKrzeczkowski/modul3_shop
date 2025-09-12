import { prisma } from "@/lib/prisma";

type Product = {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  category: string;
  categoryImage?: string | null;
};

export async function getRecommendedProducts(): Promise<Product[]> {
  try {

    const productsRaw = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        categoryId: true,
        price: true,
        category: {
          select: { name: true, image: true }, 
        },
      },
    });

 
    const products: Product[] = productsRaw.map((p) => ({
      id: p.id,
      name: p.name,
      categoryId: p.categoryId,
      price: p.price,
      category: p.category.name,
      categoryImage: p.category.image,
    }));

    if (!products.length) {
      return []; 
    }

  
    const categoriesMap: Record<number, Product[]> = {};
    for (const product of products) {
      if (!categoriesMap[product.categoryId]) {
        categoriesMap[product.categoryId] = [];
      }
      categoriesMap[product.categoryId].push(product);
    }

    const selected: Product[] = [];

   
    for (const category of Object.keys(categoriesMap)) {
      const items = categoriesMap[parseInt(category)];
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