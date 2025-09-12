import { prisma } from "@/lib/prisma";

async function main() {
  console.log(" Seeding...");

  // --- Kategorie ---
  const mice = await prisma.category.create({
    data: {
      name: "Myszki",
      description: "Gamingowe i biurowe myszy",
      image: "https://i.ibb.co/bjNFJd9L/mouse-img.png",
    },
  });

  const keyboards = await prisma.category.create({
    data: {
      name: "Klawiatury",
      description: "Mechaniczne i membranowe klawiatury",
      image: "https://i.ibb.co/xSnySykr/images.jpg",
    },
  });

  const headsets = await prisma.category.create({
    data: {
      name: "Słuchawki",
      description: "Słuchawki przewodowe i bezprzewodowe",
      image: "https://i.ibb.co/4wLdY4Jx/pobrane.jpg",
    },
  });

  const monitors = await prisma.category.create({
    data: {
      name: "Monitory",
      description: "Monitory dla graczy i profesjonalistów",
      image: "https://i.ibb.co/Bkv5z1T/pobrane-1.jpg",
    },
  });

  const webcams = await prisma.category.create({
    data: {
      name: "Kamerki internetowe",
      description: "Kamerki HD i 4K do wideokonferencji",
      image: "https://i.ibb.co/9kcrv3Rh/pobrane-2.jpg",
    },
  });

  // --- Brandy ---
  const rog = await prisma.brand.create({
    data: {
      name: "ROG",
      logo: "https://i.ibb.co/GQ70wLc0/ROG-Logo.png",
    },
  });

  const logitech = await prisma.brand.create({
    data: {
      name: "Logitech",
      logo: "https://i.ibb.co/kssx8PGX/Logitech-Logo.png",
    },
  });

  const jbl = await prisma.brand.create({
    data: {
      name: "JBL",
      logo: "https://i.ibb.co/s9QjxkZg/JBL-Logo.png",
    },
  });

  const aoc = await prisma.brand.create({
    data: {
      name: "AOC",
      logo: "https://i.ibb.co/Xr0NBQwx/AOC-Logo.png",
    },
  });

  const razer = await prisma.brand.create({
    data: {
      name: "Razer",
      logo: "https://i.ibb.co/jkL00Htg/Razer-Logo.png",
    },
  });

  const rexus = await prisma.brand.create({
    data: {
      name: "Rexus",
      logo: "https://i.ibb.co/gZ0PwjsF/Rexus-Logo.png",
    },
  });

  // --- Produkty ---
  await prisma.product.createMany({
    data: [
      // Myszki (5)
      { name: "Logitech G502 HERO", price: 299.99, stock: 40, categoryId: mice.id, brandId: logitech.id },
      { name: "Razer DeathAdder V2", price: 249.99, stock: 30, categoryId: mice.id, brandId: razer.id },
      { name: "ROG Gladius III", price: 349.99, stock: 15, categoryId: mice.id, brandId: rog.id },
      { name: "Rexus X15", price: 199.99, stock: 20, categoryId: mice.id, brandId: rexus.id },
      { name: "AOC GM200", price: 179.99, stock: 25, categoryId: mice.id, brandId: aoc.id },

      // Klawiatury (5)
      { name: "Razer BlackWidow V3", price: 499.99, stock: 35, categoryId: keyboards.id, brandId: razer.id },
      { name: "Logitech G213 Prodigy", price: 299.99, stock: 50, categoryId: keyboards.id, brandId: logitech.id },
      { name: "ROG Claymore II", price: 749.99, stock: 10, categoryId: keyboards.id, brandId: rog.id },
      { name: "Rexus MX9", price: 229.99, stock: 25, categoryId: keyboards.id, brandId: rexus.id },
      { name: "AOC GK500", price: 349.99, stock: 20, categoryId: keyboards.id, brandId: aoc.id },

      // Słuchawki (5)
      { name: "Razer Kraken X", price: 199.99, stock: 40, categoryId: headsets.id, brandId: razer.id },
      { name: "Logitech G733", price: 549.99, stock: 20, categoryId: headsets.id, brandId: logitech.id },
      { name: "ROG Delta S", price: 699.99, stock: 15, categoryId: headsets.id, brandId: rog.id },
      { name: "JBL Quantum 400", price: 449.99, stock: 30, categoryId: headsets.id, brandId: jbl.id },
      { name: "Rexus HX10", price: 299.99, stock: 25, categoryId: headsets.id, brandId: rexus.id },

      // Monitory (5)
      { name: "AOC 24G2", price: 899.99, stock: 20, categoryId: monitors.id, brandId: aoc.id },
      { name: "ROG Swift PG259QNR", price: 3999.99, stock: 5, categoryId: monitors.id, brandId: rog.id },
      { name: "Logitech L27", price: 1599.99, stock: 12, categoryId: monitors.id, brandId: logitech.id },
      { name: "Razer Raptor 27", price: 2999.99, stock: 8, categoryId: monitors.id, brandId: razer.id },
      { name: "Rexus View 27F", price: 1299.99, stock: 10, categoryId: monitors.id, brandId: rexus.id },

      // Kamerki (5)
      { name: "Logitech C920 HD Pro", price: 349.99, stock: 50, categoryId: webcams.id, brandId: logitech.id },
      { name: "Razer Kiyo Pro", price: 499.99, stock: 25, categoryId: webcams.id, brandId: razer.id },
      { name: "ROG Eye S", price: 599.99, stock: 15, categoryId: webcams.id, brandId: rog.id },
      { name: "JBL LiveCam V2", price: 449.99, stock: 18, categoryId: webcams.id, brandId: jbl.id },
      { name: "Rexus StreamCam X", price: 299.99, stock: 10, categoryId: webcams.id, brandId: rexus.id },
    ],
  });

  console.log("✅ Seeding zakończony!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });