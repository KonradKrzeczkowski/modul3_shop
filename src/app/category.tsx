"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";

type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export default function CategoryCarousel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/category")
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
    <div className="w-full flex flex-col items-center  mb-[100px] bg-[var(--color-base)] ">

      <div className="flex items-center justify-between w-full h-[240px] bg-[var(--grey-200)]  ">
    
        <Button
          onClick={prevCategory}
          bgColor="var(--color-primary-500)"
          textColor="var(--color-primary-500)"
          borderColor="var(--color-primary-500)"
    borderRadius="12px"
          hoverBgColor="var(--secondary-hover-bg)"
          className={`px-4 py-2 rounded-full text-xl font-bold ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &lt;
        </Button>

     
        <div className="flex flex-col justify-between p-6 border rounded-lg w-[433px] h-[240px] relative">
          <div className="flex flex-col gap-[24px]">
            <h2 className="text-[32px] font-bold">{current.name}</h2>
            <p className="text-[16px]">{current.description}</p>
          </div>
          <div className="absolute bottom-6 left-6 w-[211px] h-[54px]">
            <Button
              textColor="var(--color-primary-500)"
              hoverBgColor="var(--color-primary-600)"
              hoverTextColor="var(--color-primary-600)"
              className="w-full h-full text-base"
              onClick={() => console.log("Explore category", current.name)}
            >
              Explore Category
            </Button>
          </div>
        </div>

        
        <div className="relative w-[268px] h-[204px]">
  <Image
    src="https://i.ibb.co/bjNFJd9L/mouse-img.png"
    alt="Myszka"
    fill
    className="object-cover"
  />
</div>

       
        <Button
          onClick={nextCategory}
          bgColor="var(--color-primary-500)"
          textColor="var(--secondary-text)"
          hoverBgColor="var(--secondary-hover-bg)"
          className={`px-4 py-2 rounded-full text-xl font-bold ${
            currentIndex === categories.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          &gt;
        </Button>
      </div>


      <div className="flex gap-3 mt-[24px]">
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
