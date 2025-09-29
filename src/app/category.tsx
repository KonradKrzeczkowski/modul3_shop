"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import ArrowRightSmall from "@/components/icons/arrowRightSmall";
import ArrowRight from "@/components/icons/arrowRight";
import ArrowLeftSmall from "@/components/icons/arrowLeftSmall";
type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export default function CategoryCarousel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const prevCategory = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextCategory = () => {
    if (currentIndex < categories.length - 1) setCurrentIndex(currentIndex + 1);
  };

  if (categories.length === 0) {
    return <p>Ładowanie kategorii...</p>;
  }

  const current = categories[currentIndex];
  return (
    <div className="w-full flex flex-col items-center h-[488px]   ">
      <div className="w-full flex flex-col items-center h-full mb-6 bg-[var(--color-base)]">
        <div className="flex items-center justify-between w-full h-full bg-[var(--grey-200)]  ">
          <Button
            onClick={prevCategory}
            bgColor="var(--color-primary-500)"
            textColor="var(--color-primary-500)"
            borderColor="var(--color-primary-500)"
            borderRadius="12px"
            hoverBgColor=""
            className={`px-4 py-2 rounded-full text-xl font-bold ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowLeftSmall />
          </Button>
          <div className="flex flex-col justify-between p-6 w-[433px] h-[240px] relative">
            <div className="flex flex-col gap-[24px]">
              <h2 className="text-[32px] font-bold">{current.name}</h2>
              <p className="text-[16px]">{current.description}</p>
            </div>
            <div className="absolute bottom-6 left-6 w-[211px] h-[54px]">
              <Button
                textColor="var(--color-primary-500)"
                hoverBgColor="var(--color-primary-600)"
                hoverTextColor="var(--color-natural-600)"
                className="w-full h-full text-base"
                borderColor="var(--color-primary-500)"
                onClick={() => router.push(`/product?category=${current.id}`)}
              >
                Explore Category
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div className="relative w-[400px] h-full">
            <Image
              src="https://i.ibb.co/bjNFJd9L/mouse-img.png"
              alt="Myszka"
              fill
              className="object-cover hidden sm:block "
            />
          </div>
          <Button
            onClick={nextCategory}
            bgColor="var(--color-primary-500)"
            textColor="var(--color-primary-500)"
            borderColor="var(--color-primary-500)"
            borderRadius="12px"
            hoverBgColor=""
            className={`px-4 py-2 rounded-full text-xl font-bold ${
              currentIndex === categories.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <ArrowRightSmall />
          </Button>
        </div>
      </div>
      <div className="flex gap-3">
        {categories.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index
                ? "bg-[var(--color-primary-500)]"
                : "bg-[var(--color-gray-200)]"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
