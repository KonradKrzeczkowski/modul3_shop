import { prisma } from "@/lib/prisma";

type Brand = {
  id: number;
  name: string;
  logo?: string | null;
};

export async function getBrands(): Promise<Brand[]> {
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

    return brands;
  } catch (error) {
    console.error("Failed to fetch brands", error);
    return [];
  }
}