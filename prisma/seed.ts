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
console.log("seede")
  // --- Produkty ---
const products=[

    // Myszki (5)
    { name: "Logitech G502 HERO", price: 299.99, stock: 40, categoryId: mice.id, brandId: logitech.id, imageUrl:"https://i.ibb.co/bjNFJd9L/mouse-img.png", description: "Logitech G502 HERO to mysz gamingowa wyposażona w ultra-precyzyjny sensor HERO 25K, 11 programowalnych przycisków oraz regulowane obciążniki, które pozwalają dopasować wagę do Twojego stylu gry. Idealna dla graczy szukających precyzji i wygody podczas długich sesji." },
    { name: "Razer DeathAdder V2", price: 249.99, stock: 30, categoryId: mice.id, brandId: razer.id, imageUrl:"https://i.ibb.co/bjNFJd9L/mouse-img.png", description: "Razer DeathAdder V2 to klasyk wśród myszy gamingowych. Wyposażona w optyczny sensor o wysokiej precyzji, ergonomiczny kształt i wytrzymałe przyciski mechaniczne, zapewnia komfort i niezawodność podczas intensywnych rozgrywek." },
    { name: "ROG Gladius III", price: 349.99, stock: 15, categoryId: mice.id, brandId: rog.id, imageUrl:"https://i.ibb.co/bjNFJd9L/mouse-img.png", description: "ROG Gladius III oferuje wymienne przełączniki, ergonomiczny kształt i precyzyjny sensor optyczny 19K. Doskonała dla graczy wymagających maksymalnej kontroli nad każdym ruchem i szybkiego reagowania w grach FPS." },
    { name: "Rexus X15", price: 199.99, stock: 20, categoryId: mice.id, brandId: rexus.id, imageUrl:"https://i.ibb.co/bjNFJd9L/mouse-img.png", description: "Rexus X15 to lekka i wygodna mysz dla graczy, oferująca wysoką precyzję oraz regulowane DPI. Idealna do długich sesji gamingowych, zapewnia płynne i szybkie ruchy w każdej grze." },
    { name: "AOC GM200", price: 179.99, stock: 25, categoryId: mice.id, brandId: aoc.id, imageUrl:"https://i.ibb.co/bjNFJd9L/mouse-img.png", description: "AOC GM200 to budżetowa mysz gamingowa z solidnym sensorem optycznym, ergonomicznym kształtem i prostym designem. Świetna dla początkujących graczy szukających dobrej jakości w rozsądnej cenie." },

    // Klawiatury (5)
    { name: "Razer BlackWidow V3", price: 499.99, stock: 35, categoryId: keyboards.id, brandId: razer.id, imageUrl:"https://i.ibb.co/xSnySykr/images.jpg", description: "Razer BlackWidow V3 to mechaniczna klawiatura gamingowa z przełącznikami Razer Green, podświetleniem RGB Chroma i wytrzymałą konstrukcją. Idealna do intensywnych gier i codziennego użytkowania." },
    { name: "Logitech G213 Prodigy", price: 299.99, stock: 50, categoryId: keyboards.id, brandId: logitech.id, imageUrl:"https://i.ibb.co/xSnySykr/images.jpg", description: "Logitech G213 Prodigy to membranowa klawiatura z pełnym podświetleniem RGB, cichymi przyciskami i ergonomiczną konstrukcją. Świetnie sprawdza się zarówno w grach, jak i do pracy biurowej." },
    { name: "ROG Claymore II", price: 749.99, stock: 10, categoryId: keyboards.id, brandId: rog.id, imageUrl:"https://i.ibb.co/xSnySykr/images.jpg", description: "ROG Claymore II to modularna klawiatura mechaniczna z odłączanym numpadem, przełącznikami Cherry MX i podświetleniem RGB. Zapewnia pełną kontrolę i komfort dla wymagających graczy." },
    { name: "Rexus MX9", price: 229.99, stock: 25, categoryId: keyboards.id, brandId: rexus.id, imageUrl:"https://i.ibb.co/xSnySykr/images.jpg", description: "Rexus MX9 oferuje ciche przełączniki, eleganckie podświetlenie i solidną konstrukcję. Idealna dla graczy, którzy cenią komfort i styl podczas rozgrywki." },
    { name: "AOC GK500", price: 349.99, stock: 20, categoryId: keyboards.id, brandId: aoc.id, imageUrl:"https://i.ibb.co/xSnySykr/images.jpg", description: "AOC GK500 to mechaniczna klawiatura gamingowa z podświetleniem RGB, wysoką wytrzymałością i wygodnym układem klawiszy. Świetna dla profesjonalnych graczy." },

    // Słuchawki (5)
    { name: "Razer Kraken X", price: 199.99, stock: 40, categoryId: headsets.id, brandId: razer.id, imageUrl:"https://i.ibb.co/4wLdY4Jx/pobrane.jpg", description: "Razer Kraken X to lekki headset gamingowy z dźwiękiem 7.1, wygodnymi nausznikami i solidną jakością wykonania. Idealny dla graczy szukających komfortu i precyzyjnego dźwięku." },
    { name: "Logitech G733", price: 549.99, stock: 20, categoryId: headsets.id, brandId: logitech.id, imageUrl:"https://i.ibb.co/4wLdY4Jx/pobrane.jpg", description: "Logitech G733 to bezprzewodowy headset z podświetleniem RGB, wysokiej jakości dźwiękiem i lekką konstrukcją. Zapewnia swobodę ruchu i komfort podczas długich sesji." },
    { name: "ROG Delta S", price: 699.99, stock: 15, categoryId: headsets.id, brandId: rog.id, imageUrl:"https://i.ibb.co/4wLdY4Jx/pobrane.jpg", description: "ROG Delta S oferuje Hi-Res audio, podświetlenie RGB i wygodne nauszniki z pianki pamięciowej. Idealny wybór dla wymagających graczy." },
    { name: "JBL Quantum 400", price: 449.99, stock: 30, categoryId: headsets.id, brandId: jbl.id, imageUrl:"https://i.ibb.co/4wLdY4Jx/pobrane.jpg", description: "JBL Quantum 400 zapewnia dźwięk przestrzenny, komfortowe nauszniki i wyraźny mikrofon, dzięki czemu gra staje się pełnym doświadczeniem audio." },
    { name: "Rexus HX10", price: 299.99, stock: 25, categoryId: headsets.id, brandId: rexus.id, imageUrl:"https://i.ibb.co/4wLdY4Jx/pobrane.jpg", description: "Rexus HX10 to słuchawki gamingowe z mocnym basem, wygodnym pałąkiem i solidnym wykonaniem, idealne do wielogodzinnych rozgrywek." },

    // Monitory (5)
    { name: "AOC 24G2", price: 899.99, stock: 20, categoryId: monitors.id, brandId: aoc.id, imageUrl:"https://i.ibb.co/Bkv5z1T/pobrane-1.jpg", description: "AOC 24G2 to monitor 24-calowy, 144Hz, 1ms czas reakcji, z żywymi kolorami i technologią FreeSync, idealny dla graczy e-sportowych." },
    { name: "ROG Swift PG259QNR", price: 3999.99, stock: 5, categoryId: monitors.id, brandId: rog.id, imageUrl:"https://i.ibb.co/Bkv5z1T/pobrane-1.jpg", description: "ROG Swift PG259QNR oferuje ekstremalne 360Hz odświeżanie, niski input lag i perfekcyjny obraz dla profesjonalnych graczy e-sportowych." },
    { name: "Logitech L27", price: 1599.99, stock: 12, categoryId: monitors.id, brandId: logitech.id, imageUrl:"https://i.ibb.co/Bkv5z1T/pobrane-1.jpg", description: "Logitech L27 to 27-calowy monitor QHD z żywymi kolorami, szybkim odświeżaniem i wsparciem Adaptive Sync, idealny do gier i pracy kreatywnej." },
    { name: "Razer Raptor 27", price: 2999.99, stock: 8, categoryId: monitors.id, brandId: razer.id, imageUrl:"https://i.ibb.co/Bkv5z1T/pobrane-1.jpg", description: "Razer Raptor 27 to gamingowy monitor IPS z podświetleniem RGB, szybkim czasem reakcji i doskonałym odwzorowaniem kolorów." },
    { name: "Rexus View 27F", price: 1299.99, stock: 10, categoryId: monitors.id, brandId: rexus.id, imageUrl:"https://i.ibb.co/Bkv5z1T/pobrane-1.jpg", description: "Rexus View 27F to monitor dla graczy z szybkim czasem reakcji, wsparciem FreeSync i jasnym, wyraźnym obrazem." },

    // Kamerki (5)
    { name: "Logitech C920 HD Pro", price: 349.99, stock: 50, categoryId: webcams.id, brandId: logitech.id, imageUrl:"https://i.ibb.co/9kcrv3Rh/pobrane-2.jpg", description: "Logitech C920 HD Pro to kamera Full HD z mikrofonem stereo i automatyczną korekcją światła, idealna do streamingu i wideokonferencji." },
    { name: "Razer Kiyo Pro", price: 499.99, stock: 25, categoryId: webcams.id, brandId: razer.id, imageUrl:"https://i.ibb.co/9kcrv3Rh/pobrane-2.jpg", description: "Razer Kiyo Pro to kamera z sensorem CMOS, regulowanym oświetleniem i wysokiej jakości obrazem, idealna do profesjonalnego streamingu." },
    { name: "ROG Eye S", price: 599.99, stock: 15, categoryId: webcams.id, brandId: rog.id, imageUrl:"https://i.ibb.co/9kcrv3Rh/pobrane-2.jpg", description: "ROG Eye S oferuje szybki autofokus, szeroki kąt widzenia i wysoką jakość obrazu, idealna dla graczy i streamerów." },
    { name: "JBL LiveCam V2", price: 449.99, stock: 18, categoryId: webcams.id, brandId: jbl.id, imageUrl:"https://i.ibb.co/9kcrv3Rh/pobrane-2.jpg", description: "JBL LiveCam V2 to kamera do spotkań online z czystym dźwiękiem i obrazem Full HD, idealna do pracy zdalnej i nauki online." },
    { name: "Rexus StreamCam X", price: 299.99, stock: 10, categoryId: webcams.id, brandId: rexus.id, imageUrl:"https://i.ibb.co/9kcrv3Rh/pobrane-2.jpg", description: "Rexus StreamCam X to kompaktowa kamera do streamingu, oferująca płynny obraz 60fps i wysoką jakość w każdych warunkach oświetleniowych." },
  ]

for (const product of products) {
  await prisma.product.create({ data: product });
}


 


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







  